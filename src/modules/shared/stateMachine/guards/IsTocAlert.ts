/**
 * Checks if the TOC Alerts should be added to a page
 */
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import Platform from '@/interfaces/Platform';

export default ({ platform, storeState: { appSettings } }: FeaturesContext): boolean =>
  appSettings.journalAlerts
  && platform === Platform.GoogleScholar;
