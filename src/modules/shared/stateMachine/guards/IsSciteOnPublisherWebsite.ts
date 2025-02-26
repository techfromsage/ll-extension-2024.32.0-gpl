import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import Platform from '@/interfaces/Platform';

/**
 * Checks if all conditions for scite integration on a publisher website are fulfilled:
 *   - Any institution has enabled scite
 *   - Any institution has enabled scite for publisher websites
 *   - User enabled scite through User Preferences
 *   - User is on a publisher website
 */
export default ({ platform, storeState: { appSettings } }: FeaturesContext): boolean => {
  const { enabled, elsewhere } = appSettings.integrations.scite;
  return enabled && elsewhere && platform === Platform.None;
};
