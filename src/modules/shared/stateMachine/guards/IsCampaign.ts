/**
 * Checks if one or more Campaign items are available.
 */
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import LibraryResourceType from '@/enums/futures/LibraryResourceType';

export default ({ libraryResources }: FeaturesContext): boolean =>
  libraryResources.some(
    ({ type }) => type === LibraryResourceType.Campaign,
  );
