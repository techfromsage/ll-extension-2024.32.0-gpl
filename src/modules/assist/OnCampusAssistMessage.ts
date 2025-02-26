/**
 * OnCampusAssistMessage formats a message for on-campus use.
 * The logic for deciding if a message is actually on/off campus is done elsewhere.
 */
import CustomMessage from '@/interfaces/assist/CustomMessage';
import LocationOption from '@/enums/LocationOption';
import AssistMessage from '@/interfaces/assist/AssistMessage';
import Institution from '@/interfaces/Institution';

/**
 *
 * @param {CustomMessage} message
 * @returns {{title: string, message: string} | {title: string, message: string}}
 */
const extractDetails = (message: CustomMessage) => {
  if (
    message.showOption === LocationOption.OnCampus
    || message.showOption === LocationOption.DiffBetweenOnAndOffCampus
  ) {
    return {
      title: message.onCampusTitle || message.title,
      message: message.onCampusMessage || message.message,
    };
  }
  return {
    title: message.title,
    message: message.message,
  };
};

/**
 * @param {CustomMessage} message
 * @param institution
 * @returns {NotificationUI}
 */
export default (message: CustomMessage, institution: Institution): AssistMessage => {
  return {
    ...extractDetails(message),
    id: message.id,
    priority: message.priority || false,
    timeOut: message.closePopup?.timeOut || false,
    institution,
  };
};
