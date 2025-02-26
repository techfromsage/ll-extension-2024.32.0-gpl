import Feature from '@/enums/Feature';
import LibraryResourceType from '@/enums/futures/LibraryResourceType';
import State from '@/enums/State';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import LibraryServicesItem from '@/interfaces/libraryResources/LibraryServicesItem';

export default (context: FeaturesContext, state: State): LibraryServicesItem[] => {
  if (state === State.NotSupported || !context.libraryResources) {
    return [];
  }
  return context.libraryResources
    .filter(({ type }) => [
      LibraryResourceType.ServiceDesk,
      LibraryResourceType.Faq,
      LibraryResourceType.Libchat,
    ].includes(type))
    .map(({ institution, ...services }): LibraryServicesItem => ({
      id: services.uuid,
      institution,
      state: State.Supported,
      feature: Feature.LibraryServices,
      libraryResourceType: services.type,
    }));
};
