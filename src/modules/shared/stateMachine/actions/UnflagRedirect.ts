import { sessionStore } from '@/store';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';

/**
 * Removes tab from redirection.
 * This means it won't show the popup again.
 */
export default (context: FeaturesContext): void => {
  const { removeRedirectedTab } = sessionStore.getState();
  removeRedirectedTab(context.currentTabId);
};
