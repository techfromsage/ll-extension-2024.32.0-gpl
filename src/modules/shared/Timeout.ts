import State from '@/enums/State';
import AssistMessage from '@/interfaces/assist/AssistMessage';
import Institution, { AutoHide } from '@/interfaces/Institution';

const AssistMessageTimeout = (defaultTimeout: number, assistMessage: AssistMessage) => {
  if (typeof assistMessage.timeOut === 'number') {
    return assistMessage.timeOut;
  }

  if (!assistMessage.timeOut) {
    return 0;
  }

  return defaultTimeout;
};

/**
 * Fetches timeout for an institution from the institution config
 * Some alternatives features can have a different timeout
 *
 * @param institution
 * @param  {State} key
 * @param assistMessage
 * @returns number
 */
export default (institution: Institution, key: State, assistMessage?: AssistMessage): number => {
  const defaultTimeout = institution.closePopup.timeOut;

  if (!key) {
    return defaultTimeout;
  }

  if (key === State.Assist && assistMessage) {
    return AssistMessageTimeout(defaultTimeout, assistMessage);
  }

  // Onboarding, Campaign, Survey - all should not timeout
  if (key === State.Modal || key === State.Campaign) {
    return 0;
  }

  const timeout = institution.auto_hide?.[key] || institution.autoHide?.[key as keyof AutoHide] || defaultTimeout;
  return timeout > 0 ? timeout : defaultTimeout;
};
