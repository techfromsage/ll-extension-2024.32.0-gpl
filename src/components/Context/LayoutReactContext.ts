/**
 * React Context for providing layout values from LayoutStateMachine.
 */
import { createContext } from 'react';
import LayoutStateValues from '@/interfaces/stateMachine/LayoutStateValues';
import LayoutState from '@/enums/stateMachine/LayoutState';
import ScreenSize from '@/enums/ui/ScreenSize';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import LayoutEventSchema from '@/interfaces/stateMachine/LayoutEventSchema';
import LibraryServicesItem from '@/interfaces/libraryResources/LibraryServicesItem';

export interface ReactContext {
  layoutValues: LayoutStateValues,
  layoutEvent: LayoutEventSchema,
  modalNotification: NotificationUI | undefined,
  notifications: NotificationUI[],
  libraryServices: LibraryServicesItem[],
  addToClosedHistory: (notification?: NotificationUI) => void,
  sendLayoutState: (layoutEvent: LayoutEvent, payload?: any) => void,
  expandedNotifications?: string[],
}

const layoutValues: LayoutStateValues = {
  layout: LayoutState.PopUp,
  openedClosed: LayoutState.Closed,
  librarySearch: LayoutState.Closed,
  citationModal: LayoutState.Closed,
  screenSize: ScreenSize.Medium,
};
const sendLayoutState: (layout: LayoutEvent) => void = () => {
  /* Empty default function */
};

export const layoutContextDefaultValues: ReactContext = {
  layoutValues,
  notifications: [],
  libraryServices: [],
  modalNotification: undefined,
  sendLayoutState,
  addToClosedHistory: () => {
    /* Empty default function */
  },
  layoutEvent: {
    type: LayoutEvent.Close,
    notifications: [],
    libraryServices: [],
  },
};

const LayoutReactContext = createContext<ReactContext>(layoutContextDefaultValues);

export default LayoutReactContext;
