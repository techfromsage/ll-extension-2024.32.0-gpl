import NotificationUI, { NotificationUIButtonLevel } from '@/interfaces/ui/NotificationUI';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import Feature from '@/enums/Feature';
import State from '@/enums/State';
import DigitalResourceType from '@/enums/DigitalResourceType';
import Content from '@/modules/shared/Content';
import Timeout from '@/modules/shared/Timeout';
import NotificationHash from '@/modules/shared/notifications/NotificationHash';
import AutoOpen from '@/modules/shared/notifications/AutoOpen';
import Logo from '@/modules/shared/InstituteLogo';
import Notification from '@/enums/Notification';

export default (
  digitalResourceType: DigitalResourceType | DigitalResourceType[],
  achievedState: State | State[],
  content: { title: string, message: string },
) => (context: FeaturesContext, state: State): NotificationUI[] => {
  const alternativeUrl = context.alternativeURLs.find(alternative => (
    digitalResourceType.includes(alternative.type) && alternative.state ? achievedState.includes(alternative.state) : false));
  if (!alternativeUrl) {
    throw new Error('No Alternative');
  }
  const { institution } = alternativeUrl;
  if (!institution) {
    throw new Error('No Alternatives institution');
  }

  const id = NotificationHash(Notification.Alternatives, context.currentUrl).generate();

  return [{
    id,
    institution,
    title: Content(institution.id, content.title),
    message: Content(institution.id, content.message),
    state,
    feature: Feature.Alternatives,
    timeOut: Timeout(institution, state),
    autoOpen: AutoOpen(institution, state, id, context),
    logo: Logo(institution),
    buttons: [{
      text: 'Get citation',
      url: alternativeUrl.urls[0],
      level: NotificationUIButtonLevel.Secondary,
    }],
    metadata: {
      digitalResource: alternativeUrl, // pass digitalResource for citation
    },
  }];
};
