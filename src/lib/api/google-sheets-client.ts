import { GOOGLE_SHEETS_CONFIG, GOOGLE_SHEETS_COLUMNS } from '@/config/googleSheets';

function pickColumn(row: Record<string, unknown>, keys: string[]): unknown {
  const normalized: Record<string, unknown> = {};
  Object.keys(row).forEach((key) => {
    normalized[key.trim().toLowerCase()] = row[key];
  });
  for (const k of keys) {
    const direct = row[k];
    if (direct !== undefined && direct !== null && direct !== '') return direct;
    const val = normalized[k.trim().toLowerCase()];
    if (val !== undefined && val !== null && val !== '') return val;
  }
  return undefined;
}

interface GvizColumn { id?: string; label?: string }
interface GvizCell { v?: string | number | null; f?: string | null }
interface GvizRow { c: GvizCell[] }
interface GvizTable { cols: GvizColumn[]; rows: GvizRow[] }
interface GvizResponse { table: GvizTable }

async function fetchGviz(sheetId: string, sheetName: string): Promise<Record<string, unknown>[]> {
  const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`;
  const variants = [
    `${base}?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`,
    `${base}?tqx=out:json`,
  ];

  for (const url of variants) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), GOOGLE_SHEETS_CONFIG.timeout);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) continue;
      const text = await res.text();
      const start = text.indexOf('{');
      const end = text.lastIndexOf('}');
      const json: GvizResponse = JSON.parse(text.slice(start, end + 1));
      const cols: string[] = json.table.cols.map((c: GvizColumn) => c.label || c.id || `col_${Math.random()}`);
      return json.table.rows.map((r: GvizRow) => {
        const obj: Record<string, unknown> = {};
        r.c.forEach((cell: GvizCell, i: number) => {
          const key = cols[i] || `col_${i}`;
          obj[key] = cell?.v ?? '';
          if (cell && typeof cell.f === 'string' && cell.f) {
            obj[`${key}__f`] = cell.f;
          }
        });
        return obj;
      });
    } catch {
      // try next variant
    }
  }

  return [];
}

export interface SheetFilm {
  id: string;
  title: string;
  slug: string;
  poster_url?: string;
  category?: string;
  release_year?: number;
  duration?: number;
  genre?: string;
  director?: string;
  trailer_url?: string;
  description?: string;
  credits?: Array<{ role: string; name: string }>
}

function normalizeCategory(value?: string): string | undefined {
  if (!value) return undefined;
  const raw = value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const doc = ['documentare','documentar','doc','documentary'];
  const fic = ['fictiune','ficțiune','fiction','narativ','narrative'];
  const prez = ['prezentare','film de prezentare','filme de prezentare','corporate','institutional','instituțional'];
  if (doc.includes(raw)) return 'documentare';
  if (fic.includes(raw)) return 'fictiune';
  if (prez.includes(raw)) return 'prezentare';
  return raw;
}

function parseYear(input: unknown): number | undefined {
  if (typeof input === 'number') {
    return Number.isFinite(input) ? input : undefined;
  }
  if (typeof input === 'string') {
    const match = input.match(/\b(19|20)\d{2}\b/);
    return match ? Number(match[0]) : undefined;
  }
  return undefined;
}

function parseNumber(input: unknown): number | undefined {
  if (typeof input === 'number') return Number.isFinite(input) ? input : undefined;
  if (typeof input === 'string') {
    const match = input.match(/\d+(?:[.,]\d+)?/);
    return match ? Number(match[0].replace(',', '.')) : undefined;
  }
  return undefined;
}

function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/^`+|`+$/g, '')
    .replace(/^"+|"+$/g, '')
    .replace(/^'+|'+$/g, '');
}

function extractFirstUrl(input: string): string | undefined {
  const str = (input || '').trim();
  const imageQuoted = str.match(/IMAGE\(\s*["']([^"']+)["']\s*(?:,.*)?\)/i);
  if (imageQuoted && imageQuoted[1]) return imageQuoted[1];
  const imageUnquoted = str.match(/IMAGE\(\s*(https?:[^\s,)]+)\s*(?:,.*)?\)/i);
  if (imageUnquoted && imageUnquoted[1]) return imageUnquoted[1];
  const hyperlinkQuoted = str.match(/HYPERLINK\(\s*["']([^"']+)["']\s*,/i);
  if (hyperlinkQuoted && hyperlinkQuoted[1]) return hyperlinkQuoted[1];
  const hyperlinkUnquoted = str.match(/HYPERLINK\(\s*(https?:[^\s,)]+)\s*,/i);
  if (hyperlinkUnquoted && hyperlinkUnquoted[1]) return hyperlinkUnquoted[1];
  const urls = str.match(/https?:\/\/[^\s)'"<>]+/gi);
  return urls && urls.length ? urls[0] : undefined;
}

function normalizeImageUrl(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname.includes('drive.google.com')) {
      const fileMatch = u.pathname.match(/\/d\/([A-Za-z0-9_-]+)/);
      const id = fileMatch?.[1] || u.searchParams.get('id');
      if (id) return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
      if (u.pathname.startsWith('/uc')) {
        const existingId = u.searchParams.get('id');
        if (existingId) return `https://drive.google.com/thumbnail?id=${existingId}&sz=w1000`;
      }
    }
    return url;
  } catch {
    return url;
  }
}

function looksLikeImageUrl(url: string): boolean {
  return /(\.png|\.jpe?g|\.webp|\.gif)(\?.*)?$/i.test(url) || url.includes('googleusercontent') || url.includes('drive.google.com');
}

function findImageUrlInRow(row: Record<string, unknown>): string | undefined {
  for (const key of Object.keys(row)) {
    const val = row[key];
    if (typeof val === 'string') {
      const u = extractFirstUrl(val);
      if (u) return u;
    }
  }
  return undefined;
}

export async function getFilmsFromSheet(params?: { category?: string }): Promise<SheetFilm[]> {
  const targetCategory = params?.category;
  const sheetNames: Array<{ slug: string; name: string }> = targetCategory && targetCategory !== 'all'
    ? [{ slug: targetCategory, name: (GOOGLE_SHEETS_CONFIG.filmsSheets as Record<string,string>)[targetCategory] || GOOGLE_SHEETS_CONFIG.filmsSheetName }]
    : Object.entries(GOOGLE_SHEETS_CONFIG.filmsSheets).map(([slug, name]) => ({ slug, name }));

  const allRows: Record<string, unknown>[] = [];
  for (const s of sheetNames) {
    const rows = await fetchGviz(GOOGLE_SHEETS_CONFIG.sheetId, s.name);
    // Annotate with sheet category when no explicit category column
    rows.forEach(r => (r['__sheet_category'] = s.slug));
    allRows.push(...rows);
  }

  const rows = allRows.length ? allRows : await fetchGviz(GOOGLE_SHEETS_CONFIG.sheetId, GOOGLE_SHEETS_CONFIG.filmsSheetName);
  const films = rows.map((row) => {
    const title = String(pickColumn(row, GOOGLE_SHEETS_COLUMNS.title) || '').trim();
    const slug = String(pickColumn(row, GOOGLE_SHEETS_COLUMNS.slug) || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$|--+/g, '-')).trim();
    const rawPoster = pickColumn(row, GOOGLE_SHEETS_COLUMNS.poster_url);
    const posterFromColumn = typeof rawPoster === 'string'
      ? (extractFirstUrl(rawPoster) || sanitizeString(rawPoster))
      : '';
    const posterCandidate = posterFromColumn || findImageUrlInRow(row) || '';
    const poster = posterCandidate ? normalizeImageUrl(String(posterCandidate)) : '';
    const categoryRaw = String((pickColumn(row, GOOGLE_SHEETS_COLUMNS.category) || row['__sheet_category'] || '') as string).trim();
    const category = normalizeCategory(categoryRaw);
    const yearRaw = pickColumn(row, GOOGLE_SHEETS_COLUMNS.release_year);
    const durationRaw = pickColumn(row, GOOGLE_SHEETS_COLUMNS.duration);
    const genre = String(pickColumn(row, GOOGLE_SHEETS_COLUMNS.genre) || '').trim();
    const director = String(pickColumn(row, GOOGLE_SHEETS_COLUMNS.director) || '').trim();
    const videoLink = sanitizeString(pickColumn(row, GOOGLE_SHEETS_COLUMNS.video_link) || '');
    const description = String(pickColumn(row, GOOGLE_SHEETS_COLUMNS.description) || '').trim();
    const release_year = parseYear(yearRaw);
    const duration = parseNumber(durationRaw);
    const trailer_url = videoLink || undefined;
    const poster_url = poster ? String(poster) : (trailer_url ? youtubeThumbnail(trailer_url) : undefined);

    const credits: Array<{ role: string; name: string }> = collectCredits(row);

    return {
      id: slug,
      title,
      slug,
      poster_url,
      category: category || undefined,
      release_year,
      duration,
      genre: genre || undefined,
      director: director || undefined,
      trailer_url,
      description: description || undefined,
      credits: credits.length ? credits : undefined,
    } as SheetFilm;
  }).filter(f => f.title);

  const filtered = params?.category && params.category !== 'all'
    ? films.filter(f => (f.category || '').toLowerCase() === params!.category!.toLowerCase())
    : films;

  return filtered;
}

export async function getFilmBySlugFromSheets(slug: string): Promise<SheetFilm | null> {
  const sheetNames = Object.entries(GOOGLE_SHEETS_CONFIG.filmsSheets).map(([s, name]) => ({ slug: s, name }));
  const allRows: Record<string, unknown>[] = [];
  for (const s of sheetNames) {
    const rows = await fetchGviz(GOOGLE_SHEETS_CONFIG.sheetId, s.name);
    rows.forEach(r => (r['__sheet_category'] = s.slug));
    allRows.push(...rows);
  }
  if (!allRows.length) return null;
  const films = await getFilmsFromSheet();
  const match = films.find(f => f.slug === slug);
  return match || null;
}
function youtubeThumbnail(url: string): string | undefined {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return `https://img.youtube.com/vi/${u.pathname.slice(1)}/hqdefault.jpg`;
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      return v ? `https://img.youtube.com/vi/${v}/hqdefault.jpg` : undefined;
    }
    return undefined;
  } catch {
    const id = getYouTubeIdFlexible(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : undefined;
  }
}

function getYouTubeIdFlexible(input: string): string | undefined {
  const str = (input || '').trim();
  const patterns = [
    /youtu\.be\/([A-Za-z0-9_-]{11})/i,
    /[?&]v=([A-Za-z0-9_-]{11})/i,
    /\/embed\/([A-Za-z0-9_-]{11})/i,
  ];
  for (const p of patterns) {
    const m = str.match(p);
    if (m && m[1]) return m[1];
  }
  return undefined;
}

function collectCredits(row: Record<string, unknown>): Array<{ role: string; name: string }> {
  const mapping: Array<{ role: string; keys: string[] }> = [
    { role: 'Regie', keys: ['Regie'] },
    { role: 'Scenariu', keys: ['Scenariu'] },
    { role: 'Imagine', keys: ['Imagine'] },
    { role: 'Montaj', keys: ['Montaj'] },
    { role: 'Sunet', keys: ['Sunet'] },
    { role: 'Design grafic', keys: ['Design grafic'] },
    { role: 'Voce', keys: ['Voce'] },
    { role: 'Muzică', keys: ['Muzică'] },
    { role: 'Asistenţă tehnică', keys: ['Asistenţă tehnică'] },
    { role: 'Coordonator de proiect', keys: ['Coordonator de proiect'] },
    { role: 'Producţie', keys: ['Producţie'] },
    { role: 'Echipă', keys: ['echipa', 'Echipa'] },
  ];
  const out: Array<{ role: string; name: string }> = [];
  for (const m of mapping) {
    const v = String(pickColumn(row, m.keys) || '').trim();
    if (v) out.push({ role: m.role, name: v });
  }
  return out;
}
