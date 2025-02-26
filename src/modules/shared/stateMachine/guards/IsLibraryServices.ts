/**
 * Checks if one or more Modal items are available.
 */
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import LibraryResourceType from '@/enums/futures/LibraryResourceType';

export default ({ libraryResources }: FeaturesContext): boolean =>
  libraryResources.some(
    ({ type }) => [
      LibraryResourceType.ServiceDesk,
      LibraryResourceType.Faq,
      LibraryResourceType.Libchat,
    ].includes(type),
  );
