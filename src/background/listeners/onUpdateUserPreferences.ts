/**
 * Register background listener for when the user's preferences are updated from the settings form via content-script.
 */

import AppSettings from '@/interfaces/AppSettings';
import { store, StoreState } from '@/store';

const handleSettings = (settings: Subset<AppSettings>): Subset<AppSettings> => {
  if (settings.managedDomains?.domains) {
    const domain = settings.managedDomains.domains;
    const { domains } = store.getState().appSettings.managedDomains;
    const newDomains = domains.filter(value => !value.includes(domain.toString()));
    if (newDomains.length === domains.length) {
      newDomains.push(domain.toString());
    }
    return { managedDomains: { domains: newDomains } };
  }
  return settings;
};

export default (settings: Partial<AppSettings>): Promise<StoreState> => {
  const {
    updateUserPreferences,
    setContent,
    institutes,
    translations,
    config,
    refreshAppSettings,
  } = store.getState();
  updateUserPreferences(handleSettings(settings));
  if (settings.language) {
    setContent(institutes, translations, settings.language, config?.text);
  }
  refreshAppSettings();
  return Promise.resolve(store.getState());
};
