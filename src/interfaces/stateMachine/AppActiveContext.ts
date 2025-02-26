import { SessionStoreState, StoreState } from '@/store';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';

interface AppActiveContext {
  toggleAppActive: (appActive: boolean) => void,
  storeState: StoreState,
  sessionStoreState: SessionStoreState,
  currentLocation: URL,
  sendLayoutState: (eventType: LayoutEvent) => void,
  sendSettingsFormState: (eventType: SettingsFormEvent, payload?: Record<string, any>) => void,
  tabUuid: string,
  extensionUrl: URL,
  digitalResourceIds: string[],
  reloadCount: number,
}

export default AppActiveContext;
