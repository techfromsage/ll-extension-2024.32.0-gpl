/**
 * Interface BrowserMethods standardizes interactions with the browser,
 * so they can be implemented for each browser separately.
 */
import AlarmMethods from '@/interfaces/browser/AlarmMethods';
import AppMethods from '@/interfaces/browser/AppMethods';
import ContextMenusMethods from '@/interfaces/browser/ContextMenusMethods';
import NavigationMethods from '@/interfaces/browser/NavigationMethods';
import NetworkMethods from '@/interfaces/browser/NetworkMethods';
import PermissionMethods from '@/interfaces/browser/PermissionMethods';
import PopupMethods from '@/interfaces/browser/PopupMethods';
import RuntimeMethods from '@/interfaces/browser/RuntimeMethods';
import StorageMethods from '@/interfaces/browser/StorageMethods';
import TabMethods from '@/interfaces/browser/TabMethods';
import ToolbarMethods from '@/interfaces/browser/ToolbarMethods';
import WindowMethods from '@/interfaces/browser/WindowMethods';

interface BrowserMethods {
  alarms: AlarmMethods,
  app: AppMethods,
  contextMenus: ContextMenusMethods,
  navigation: NavigationMethods,
  network: NetworkMethods,
  permissions: PermissionMethods,
  popup: PopupMethods,
  runtime: RuntimeMethods,
  storage: StorageMethods,
  tabs: TabMethods,
  toolbar: ToolbarMethods,
  windows: WindowMethods,
}

export default BrowserMethods;
