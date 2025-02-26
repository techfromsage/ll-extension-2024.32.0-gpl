import NotificationUI from '@/interfaces/ui/NotificationUI';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import RedirectType from '@/enums/RedirectType';
import Feature from '@/enums/Feature';
import State from '@/enums/State';
import Content from '@/modules/shared/Content';
import Timeout from '@/modules/shared/Timeout';
import NotificationHash from '@/modules/shared/notifications/NotificationHash';
import InstituteLogo from '@/modules/shared/InstituteLogo';
import AutoOpen from '@/modules/shared/notifications/AutoOpen';
import Notification from '@/enums/Notification';

export default (
  redirectType: RedirectType,
  content: { title: string, message: string },
) => (context: FeaturesContext, state: State, feature: Feature): NotificationUI[] => {
  const redirect = context.sessionStoreState.redirectedTabs.find(
    ({ tabId, type }) => tabId === context.currentTabId && type === redirectType,
  );
  if (!redirect) {
    throw new Error(`No redirect found for "${redirectType}"`);
  }

  const { institution } = redirect;
  const id = NotificationHash(Notification.Redirected, context.currentUrl).generate();
  return [{
    id,
    institution,
    title: Content(institution.id, content.title),
    message: Content(institution.id, content.message),
    feature,
    state,
    timeOut: Timeout(institution, state),
    autoOpen: AutoOpen(institution, state, id, context),
    logo: InstituteLogo(institution),
    metadata: {
      resourceDomain: redirect.metadata?.resourceDomain,
    },
  }];
};
