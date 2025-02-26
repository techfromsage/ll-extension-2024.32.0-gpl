import InstitutionItems from '@/interfaces/InstitutionItems';
import CustomMessage from '@/interfaces/assist/CustomMessage';
import Institution from '@/interfaces/Institution';
import OnCampus from '@/interfaces/OnCampus';
import CustomMessages from '@/modules/assist/CustomMessages';
import Campus from '@/modules/shared/Campus';
import OnCampusAssistMessage from '@/modules/assist/OnCampusAssistMessage';
import OffCampusAssistMessage from '@/modules/assist/OffCampusAssistMessage';
import AssistMessage from '@/interfaces/assist/AssistMessage';

/**
 * Obtains the most relevant Assist message for use in Content Script.
 *
 * @param tabUrl
 * @param {InstitutionItems<CustomMessage>} customMessages
 * @param {Institution[]} institutes
 * @param {OnCampus} onCampus
 * @returns {AssistMessage | undefined}
 */
const assist = (
  tabUrl: URL,
  customMessages: InstitutionItems<CustomMessage>,
  institutes: Institution[],
  onCampus: OnCampus,
): (AssistMessage | undefined
  ) => {
  if (!Object.keys(customMessages).length) {
    return undefined;
  }

  const message: CustomMessage = CustomMessages(customMessages, institutes, onCampus).bestMatch(tabUrl);
  if (!message) {
    return undefined;
  }
  const institution = institutes.find(({ id }) => id === `${message.institution}`);
  if (!institution) {
    return undefined;
  }
  const isOnCampus = Campus().get(message.institution, onCampus);
  return isOnCampus ? OnCampusAssistMessage(message, institution) : OffCampusAssistMessage(message, institution);
};

export default assist;
