import { StoreState } from '@/store';
import Campus from '@/modules/shared/Campus';
import browserMethods from '@/browserMethods';
import SelectedTextSearch from '@/modules/searchEnhancers/SelectedTextSearch';

/**
 * Once the institution data has been fetched and stored, we need to configure
 * parts of the extension that are affected by the institution data,
 * such as setting the notification order, text content etc...
 */
export default (store: StoreState) => {
  const {
    institutes,
    translations,
    appSettings,
    setContent,
    setNotificationsOrder,
    refreshAppSettings,
    clientId,
    currentIp,
    config,
  } = store;

  if (!institutes.length || !config) {
    refreshAppSettings();
    return;
  }

  setContent(institutes, translations, appSettings.language, config.text);
  const [primary] = institutes;
  const { alternatives } = primary;
  setNotificationsOrder(
    institutes.length > 1,
    alternatives.enabled && alternatives.openAccess.priority,
  );
  Campus().set(institutes, currentIp);
  refreshAppSettings();

  browserMethods.runtime.setUninstallUrl(`${config.api.uninstallUrl}&instituteId=${institutes[0].id}&clientId=${clientId}`);

  // Configure the context menu
  const { removeAll, create } = browserMethods.contextMenus.background;
  removeAll();
  institutes.forEach(institution => SelectedTextSearch.createMenu(create, institution, institutes.length > 1));
};
