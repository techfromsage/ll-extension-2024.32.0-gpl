import NotificationUI from '@/interfaces/ui/NotificationUI';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import AssistMessage from '@/interfaces/assist/AssistMessage';
import State from '@/enums/State';
import Timeout from '@/modules/shared/Timeout';
import AutoOpen from '@/modules/shared/notifications/AutoOpen';
import NotificationHash from '@/modules/shared/notifications/NotificationHash';
import InstituteLogo from '@/modules/shared/InstituteLogo';
import Feature from '@/enums/Feature';
import Notification from '@/enums/Notification';

export default (context: FeaturesContext, state: State): NotificationUI[] => {
  const assistMessage = context.assistMessage as AssistMessage;

  const id = NotificationHash(Notification.Assist, context.currentUrl).generate();
  const autoOpen = AutoOpen(assistMessage.institution, state, id, context);
  return [{
    id,
    title: assistMessage.title,
    message: assistMessage.message,
    institution: assistMessage.institution,
    timeOut: Timeout(assistMessage.institution, State.Assist, assistMessage),
    state,
    feature: Feature.Assist,
    autoOpen,
    logo: InstituteLogo(assistMessage.institution),
    metadata: {
      linkType: 'content',
      assistMessageId: `${assistMessage.id}`,
    },
  }];
};
