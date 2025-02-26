import NotificationUI from '@/interfaces/ui/NotificationUI';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import Feature from '@/enums/Feature';
import State from '@/enums/State';
import Timeout from '@/modules/shared/Timeout';
import LibraryResourceType from '@/enums/futures/LibraryResourceType';
import Logo from '@/modules/shared/InstituteLogo';
import AutoOpenModal from '@/modules/shared/notifications/AutoOpenModal';

export default () => (context: FeaturesContext, state: State, feature: Feature): NotificationUI[] => {
  const {
    libraryResources, storeState, sessionStoreState, currentUrl,
  } = context;
  return libraryResources
    .filter(({ type, uuid }) => type === LibraryResourceType.Campaign
      && !sessionStoreState.closedPopupHistory.includes(uuid))
    .map(
      ({ institution, ...modal }): NotificationUI => ({
        id: modal.uuid,
        institution,
        title: modal.title,
        buttons: [{
          text: storeState.appSettings.customizations.nps_text,
          url: `llExtension://campaign?uuid=${modal.uuid}`,
        }],
        feature,
        state,
        timeOut: Timeout(institution, state),
        autoOpen: AutoOpenModal(modal.uuid, storeState, sessionStoreState, currentUrl, modal.frequency),
        logo: Logo(institution),
        libraryResourceType: modal.type,
        frequency: modal.frequency,
      }),
    );
};
