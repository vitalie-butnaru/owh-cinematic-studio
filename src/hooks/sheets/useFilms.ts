import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getFilmsFromSheet, SheetFilm } from '@/lib/api/google-sheets-client';

export const sheetsFilmKeys = {
  all: ['sheets-films'] as const,
  list: (params?: { category?: string }) => [...sheetsFilmKeys.all, 'list', params] as const,
};

export function useSheetsFilms(
  params?: { category?: string },
  options?: Omit<UseQueryOptions<SheetFilm[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: sheetsFilmKeys.list(params),
    queryFn: () => getFilmsFromSheet(params),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 5,
    ...options,
  });
}
