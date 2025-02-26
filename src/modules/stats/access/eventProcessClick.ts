import LLAStatType from '@/enums/LLAStatType';
import browserMethods from '@/browserMethods';
import NotificationUI from '@/interfaces/ui/NotificationUI';

export default (notification: NotificationUI, toUrl: URL, tabUuid: string) => {
  browserMethods.app.statEventAccess({
    type: LLAStatType.PROCESS_CLICK,
    state: notification.state,
    createTab: toUrl.hostname,
    linkType: notification.metadata?.linkType || 'content',
    referenceId: tabUuid,
    instituteId: notification.institution.id,
    assistMessageId: notification.metadata?.assistMessageId, // Assist
    resourceReferenceId: notification.metadata?.digitalResource?.referenceId, // Alternatives
    openAccessProvider: notification.openAccess?.source, // Alternatives
  });
};
