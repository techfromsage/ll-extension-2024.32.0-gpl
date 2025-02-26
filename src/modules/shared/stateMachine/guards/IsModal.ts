/**
 * Checks if one or more Modal items are available.
 */
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import LibraryResourceType from '@/enums/futures/LibraryResourceType';

export default ({ libraryResources, storeState: { appSettings } }: FeaturesContext): boolean =>
  libraryResources.some(
    ({ type, lang }) =>
      [LibraryResourceType.Onboarding, LibraryResourceType.Survey].includes(type)
      && (lang ? lang === appSettings.language : true),
  );
