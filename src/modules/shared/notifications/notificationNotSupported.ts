import NotificationUI from '@/interfaces/ui/NotificationUI';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import Feature from '@/enums/Feature';
import State from '@/enums/State';
import Content from '@/modules/shared/Content';
import Timeout from '@/modules/shared/Timeout';
import NotificationHash from '@/modules/shared/notifications/NotificationHash';
import Logo from '@/modules/shared/InstituteLogo';
import Notification from '@/enums/Notification';

export default (
  context: FeaturesContext,
): NotificationUI[] => {
  const { institutions } = context;
  const institution = institutions[0];
  if (!institution) {
    throw new Error('No institution found');
  }

  const content = {
    title: 'titleNotSupported',
    message: 'contentNotSupported',
    button: 'notSupported',
  };
  return [{
    id: NotificationHash(Notification.NotSupported, context.currentUrl).generate(),
    institution,
    title: Content(institution.id, content.title),
    message: Content(institution.id, content.message),
    buttons: [],
    state: State.NotSupported,
    feature: Feature.Access,
    timeOut: Timeout(institution, State.NotSupported),
    autoOpen: false,
    logo: Logo(institution),
  }];
};
