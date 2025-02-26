/**
 * OffCampusAssistMessage formats a message for off-campus use.
 * The logic for deciding if a message is actually on/off campus is done elsewhere.
 */
import CustomMessage from '@/interfaces/assist/CustomMessage';
import AssistMessage from '@/interfaces/assist/AssistMessage';
import Institution from '@/interfaces/Institution';

/**
 * @param {CustomMessage} message
 * @param institution
 * @returns {NotificationUI}
 */
export default (message: CustomMessage, institution: Institution): AssistMessage => ({
  id: message.id,
  priority: message.priority || false,
  timeOut: message.closePopup?.timeOut || false,
  title: message.title,
  message: message.message,
  institution,
});
