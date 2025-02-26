import NotificationUI, { NotificationUIButtonLevel } from '@/interfaces/ui/NotificationUI';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import ResourceDomainTypes from '@/enums/ResourceDomainTypes';
import Feature from '@/enums/Feature';
import Content from '@/modules/shared/Content';
import Timeout from '@/modules/shared/Timeout';
import NotificationHash from '@/modules/shared/notifications/NotificationHash';
import AccessInfo from '@/modules/shared/stateMachine/context/AccessInfo';
import AutoOpen from '@/modules/shared/notifications/AutoOpen';
import State from '@/enums/State';
import AccessLoginUrl from '@/modules/shared/stateMachine/context/AccessLoginUrl';
import Logo from '@/modules/shared/InstituteLogo';
import Notification from '@/enums/Notification';

export default (
  resourceDomainType: ResourceDomainTypes,
  content: { title: string, message: string, button: string },
) => (context: FeaturesContext, state: State): NotificationUI[] => {
  const {
    access,
    institution,
    accessConnection,
  } = AccessInfo(resourceDomainType, context.accessConnections);

  const id = NotificationHash(Notification.Access, context.currentUrl).generate();

  const url = AccessLoginUrl(access.type, access.prefixUrl, context.currentUrl.toString());
  const buttons = [
    {
      text: 'Get citation',
      url,
      level: NotificationUIButtonLevel.Secondary,
    },
    {
      text: Content(institution.id, content.button),
      url,
    },
  ];

  return [{
    id,
    institution,
    title: Content(institution.id, content.title),
    message: Content(institution.id, content.message),
    buttons,
    state,
    feature: Feature.Access,
    timeOut: Timeout(institution, state),
    autoOpen: AutoOpen(institution, state, id, context),
    logo: Logo(institution),
    metadata: {
      digitalResource: context.alternativeURLs?.[0], // pass digitalResource for citation
      resourceDomain: accessConnection.resource,
    },
  }];
};
