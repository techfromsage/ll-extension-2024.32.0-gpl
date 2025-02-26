import NotificationUI from '@/interfaces/ui/NotificationUI';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import Feature from '@/enums/Feature';
import State from '@/enums/State';
import Content from '@/modules/shared/Content';
import Timeout from '@/modules/shared/Timeout';
import Logo from '@/modules/shared/InstituteLogo';
import NotificationHash from '@/modules/shared/notifications/NotificationHash';
import AutoOpen from '@/modules/shared/notifications/AutoOpen';
import Notification from '@/enums/Notification';

export default () => (context: FeaturesContext, state: State, feature: Feature): NotificationUI[] => {
  const { institutions } = context;
  const institution = institutions[0];
  if (!institution) {
    throw new Error('No institution found');
  }

  const content = {
    title: 'titleOnCampusNotSupported',
    message: 'contentOnCampusNotSupported',
  };
  const id = NotificationHash(Notification.OnCampusNotSupported, context.currentUrl).generate();
  return [{
    id,
    institution,
    title: Content(institution.id, content.title),
    message: Content(institution.id, content.message),
    buttons: [],
    state,
    feature,
    timeOut: Timeout(institution, state),
    autoOpen: AutoOpen(institution, state, id, context),
    logo: Logo(institution),
  }];
};
