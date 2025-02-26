/**
 * Checks if keyword enhancement packages are available.
 */
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';

export default ({ keywordPackages, storeState: { appSettings } }: FeaturesContext): boolean => {
  return appSettings.keywordEnhancements.enabled && !!keywordPackages.length;
};
