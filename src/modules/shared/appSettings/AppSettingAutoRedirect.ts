/**
 * AppSettingAutoRedirect
 */
import AppSettings from '@/interfaces/AppSettings';

export default (numInstitutes: number, userPreferences: Subset<AppSettings>): Subset<AppSettings> => {
  if (numInstitutes > 1) {
    return { autoRedirect: false };
  }

  if (userPreferences.autoRedirect !== undefined) {
    return { autoRedirect: userPreferences.autoRedirect };
  }

  return {};
};
