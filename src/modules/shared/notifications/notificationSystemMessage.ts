import NotificationUI from '@/interfaces/ui/NotificationUI';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import State from '@/enums/State';
import AutoOpen from '@/modules/shared/notifications/AutoOpen';
import NotificationHash from '@/modules/shared/notifications/NotificationHash';
import Feature from '@/enums/Feature';
import Notification from '@/enums/Notification';
import SystemMessage from '@/interfaces/systemMessage/SystemMessage';
import browserMethods from '@/browserMethods';
import placeholderLogo from '@/assets/svg/placeholderLogo.svg';

export default (context: FeaturesContext, state: State): NotificationUI[] => {
  const systemMessage = context.systemMessage as SystemMessage;

  const id = NotificationHash(Notification.Assist, context.currentUrl).generate();
  const autoOpen = AutoOpen(systemMessage.institution, State.Assist, id, context);
  return [{
    id,
    title: systemMessage.title,
    message: systemMessage.message,
    institution: systemMessage.institution,
    state,
    feature: Feature.SystemMessage,
    autoOpen,
    logo: browserMethods.runtime.getURL(placeholderLogo),
    timeOut: 0,
  }];
};
