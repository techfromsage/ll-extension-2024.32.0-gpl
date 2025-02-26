import { StoreSlice } from '@/store';
import AppSettings from '@/interfaces/AppSettings';
import defaultAppSettings from '@/store/shared/appSettings/defaultAppSettings';
import AppSettingsForInstitutions from '@/modules/shared/appSettings/AppSettingsForInstitutions';
import AppSettingAutoRedirect from '@/modules/shared/appSettings/AppSettingAutoRedirect';
import merge from 'lodash.merge';

export interface AppSettingsSlice {
  appSettings: AppSettings,
  refreshAppSettings: () => void,
}

export const createAppSettingsSlice: StoreSlice<AppSettingsSlice> = set => ({
  appSettings: defaultAppSettings,
  refreshAppSettings: () => {
    set(storeState => {
      return {
        appSettings: merge(
          JSON.parse(JSON.stringify(defaultAppSettings)),
          AppSettingsForInstitutions(storeState),
          AppSettingAutoRedirect(storeState.institutes.length, storeState.userPreferences),
          JSON.parse(JSON.stringify(storeState.userPreferences)),
        ),
      };
    });
  },
});
