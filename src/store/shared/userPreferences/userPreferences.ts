import mergeWith from 'lodash.mergewith';
import { StoreSlice } from '@/store';
import AppSettings from '@/interfaces/AppSettings';

export interface UserPreferencesSlice {
  userPreferences: Subset<AppSettings>,
  updateUserPreferences: (somePreferences: Subset<AppSettings>) => void,
}

export const createUserPreferencesSlice: StoreSlice<UserPreferencesSlice> = set => ({
  userPreferences: {},
  updateUserPreferences: somePreferences => {
    set(state => {
      const userPreferences = mergeWith(
        { ...state.userPreferences },
        somePreferences,
        // mergeWith accepts customizer
        // If customizer returns an array then Lodash does a recursive merging of values.
        // If customizer returns undefined then merge is used to combine the values.
        (_, newValues) => (Array.isArray(newValues) ? newValues : undefined),
      );
      return { userPreferences };
    });
  },
});
