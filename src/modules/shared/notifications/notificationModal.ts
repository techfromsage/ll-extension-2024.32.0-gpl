import NotificationUI from '@/interfaces/ui/NotificationUI';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import Feature from '@/enums/Feature';
import State from '@/enums/State';
import Timeout from '@/modules/shared/Timeout';
import LibraryResourceType from '@/enums/futures/LibraryResourceType';
import AutoOpenModal from '@/modules/shared/notifications/AutoOpenModal';
import Logo from '@/modules/shared/InstituteLogo';

export default () => (context: FeaturesContext, state: State, feature: Feature): NotificationUI[] => {
  return context.libraryResources
    .filter(({ type, lang }) =>
      [LibraryResourceType.Onboarding, LibraryResourceType.Survey].includes(type)
      && lang === context.storeState.appSettings.language)
    .map(modal => ({
      id: modal.uuid,
      institution: modal.institution,
      title: modal.title,
      feature,
      state,
      timeOut: Timeout(modal.institution, state),
      autoOpen: AutoOpenModal(modal.uuid, context.storeState, context.sessionStoreState, context.currentUrl, modal.frequency),
      logo: Logo(modal.institution),
      libraryResourceType: modal.type,
      frequency: modal.frequency,
    }));
};
