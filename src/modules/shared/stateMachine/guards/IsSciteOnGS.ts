import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import Platform from '@/interfaces/Platform';

/**
 * Checks if all conditions for scite integration on GS are fulfilled:
 *   - Any institution has enabled scite
 *   - Any institution has enabled scite for Google Scholar
 *   - User enabled scite through User Preferences
 *   - User is on Google Scholar page
 */
export default ({ platform, storeState: { appSettings } }: FeaturesContext): boolean => {
  const { enabled, googleScholar } = appSettings.integrations.scite;
  return enabled && googleScholar && platform === Platform.GoogleScholar;
};
