/**
 * WordPress Hooks Barrel Export
 * Centralized export for all WordPress API hooks
 */

// Films
export * from './useFilms';

// Productions
export * from './useProductions';

// Blog
export * from './useBlog';

// Equipment
export * from './useEquipment';

// Series
export {
  useSeries,
  useSeriesItem,
  useSeriesEpisodes,
  seriesKeys,
} from './useSeries';

// Team
export {
  useTeam,
  useTeamMember,
  teamKeys,
} from './useTeam';

// Projects
export {
  useProjects,
  useProject,
  projectKeys,
} from './useProjects';

// Events
export {
  useEvents,
  useEvent,
  useUpcomingEvents,
  eventKeys,
} from './useEvents';

// Design & Settings
export {
  useDesignSettings,
  useMenus,
  settingsKeys,
} from './useSettings';
