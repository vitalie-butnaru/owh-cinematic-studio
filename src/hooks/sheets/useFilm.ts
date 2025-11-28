import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getFilmBySlugFromSheets, SheetFilm } from '@/lib/api/google-sheets-client';

export const sheetsFilmDetailKeys = {
  all: ['sheets-film-detail'] as const,
  detail: (slug: string) => [...sheetsFilmDetailKeys.all, slug] as const,
};

export function useSheetsFilm(
  slug: string,
  options?: Omit<UseQueryOptions<SheetFilm | null>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: sheetsFilmDetailKeys.detail(slug),
    queryFn: () => getFilmBySlugFromSheets(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 5,
    ...options,
  });
}
