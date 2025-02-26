import NotificationUI from '@/interfaces/ui/NotificationUI';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import State from '@/enums/State';
import Content from '@/modules/shared/Content';
import Timeout from '@/modules/shared/Timeout';
import NotificationHash from '@/modules/shared/notifications/NotificationHash';
import Connected from '@/modules/shared/stateMachine/context/Connected';
import AutoOpen from '@/modules/shared/notifications/AutoOpen';
import Logo from '@/modules/shared/InstituteLogo';
import Feature from '@/enums/Feature';
import Notification from '@/enums/Notification';

export default (context: FeaturesContext, state: State): NotificationUI[] => {
  const connection = context.accessConnections.find(Connected);
  if (!connection?.resource?.institution) {
    throw new Error('No access connection');
  }

  const { institution } = connection.resource;

  const id = NotificationHash(Notification.Connected, context.currentUrl).generate();
  return [{
    id,
    institution,
    title: Content(institution.id, 'titleConnected'),
    message: Content(institution.id, 'contentConnected'),
    state,
    feature: Feature.Access,
    timeOut: Timeout(institution, state),
    autoOpen: AutoOpen(institution, state, id, context),
    logo: Logo(institution),
  }];
};
