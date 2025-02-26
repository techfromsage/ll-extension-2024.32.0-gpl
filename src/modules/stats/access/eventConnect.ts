import browserMethods from '@/browserMethods';
import LLAStatType from '@/enums/LLAStatType';
import NotificationUI from '@/interfaces/ui/NotificationUI';

/**
 * eventConnect
 */
export default (notification: NotificationUI) => {
  browserMethods.app.statEventAccess({
    type: LLAStatType.CONNECT,
    state: notification.state,
    instituteId: notification.institution.id,
  });
};
