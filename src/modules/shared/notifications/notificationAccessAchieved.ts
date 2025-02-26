import NotificationUI, { NotificationUIButtonLevel } from '@/interfaces/ui/NotificationUI';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import ResourceDomainTypes from '@/enums/ResourceDomainTypes';
import Content from '@/modules/shared/Content';
import Timeout from '@/modules/shared/Timeout';
import NotificationHash from '@/modules/shared/notifications/NotificationHash';
import AccessAchieved from '@/modules/shared/stateMachine/context/AccessAchieved';
import AutoOpen from '@/modules/shared/notifications/AutoOpen';
import Logo from '@/modules/shared/InstituteLogo';
import State from '@/enums/State';
import Feature from '@/enums/Feature';
import Notification from '@/enums/Notification';

export default (
  resourceDomainType: ResourceDomainTypes,
  content: { title: string, message: string },
) => (context: FeaturesContext, state: State): NotificationUI[] => {
  const connection = context.accessConnections.find(AccessAchieved(resourceDomainType));
  const { resource } = connection || {};
  if (!connection || !resource) {
    throw new Error('No connection found');
  }
  const { institution } = resource;
  const id = NotificationHash(Notification.Access, context.currentUrl).generate();
  const autoOpen = AutoOpen(institution, state, id, context);

  return [{
    id,
    institution,
    title: Content(institution.id, content.title),
    message: Content(institution.id, content.message),
    state,
    feature: Feature.Access,
    timeOut: Timeout(institution, state),
    autoOpen,
    logo: Logo(institution),
    buttons: [{
      text: 'Get citation',
      url: context.alternativeURLs?.[0]?.urls[0],
      level: NotificationUIButtonLevel.Secondary,
    }],
    metadata: {
      digitalResource: context.alternativeURLs?.[0], // pass digitalResource for citation
      resourceDomain: resource,
    },
  }];
};
