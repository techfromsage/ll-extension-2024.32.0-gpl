import LayoutStateValues from '@/interfaces/stateMachine/LayoutStateValues';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import LayoutTypeState from '@/interfaces/stateMachine/LayoutTypeState';
import AppActiveEvent from '@/enums/stateMachine/AppActiveEvent';
import AppActiveState from '@/enums/stateMachine/AppActiveState';
import { AppTypeState } from '@/modules/shared/stateMachine/StateMachineAppActive';
import { SettingsFormContext, SettingsFormTypeState } from '@/modules/shared/stateMachine/StateMachineSettingsForm';
import SettingsFormState from '@/enums/stateMachine/SettingsFormState';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import { StoreState, SessionStoreState } from '@/store';
import LayoutEventSchema from '@/interfaces/stateMachine/LayoutEventSchema';
import LibraryServicesItem from '@/interfaces/libraryResources/LibraryServicesItem';
import { CitationContext, CitationTypeState } from '@/modules/shared/stateMachine/StateMachineCitation';
import CitationState from '@/enums/stateMachine/CitationState';
import ReferenceManagerState from '@/enums/stateMachine/ReferenceManagerState';
import ReferenceManagerEvent from '@/enums/stateMachine/ReferenceManagerEvent';
import { ReferenceManagerTypeState } from '@/modules/shared/stateMachine/StateMachineReferenceManager';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import { HighlightAndAnnotateTypeState } from '@/modules/shared/stateMachine/StateMachineHighlightAndAnnotate';
import HighlightAndAnnotateState from '@/enums/stateMachine/HighlightAndAnnotateState';
import HighlightAndAnnotateContext from '@/interfaces/stateMachine/HighlightAndAnnotateContext';

/** StateMachineLayout */
export const selectLayout = (state: LayoutTypeState): LayoutStateValues => state.value;
export const selectExpandedNotifications = (state: LayoutTypeState): string[] | undefined => state.context.expandedNotifications;
export const selectNotifications = (closedPopupHistory: string[]) => (state: LayoutTypeState): NotificationUI[] =>
  state.context.notifications.map(notification => ({
    ...notification, hasBeenClosed: closedPopupHistory.includes(`${notification.id}`),
  }));
export const selectLibraryServices = (state: LayoutTypeState): LibraryServicesItem[] => state.context.libraryServices;
export const selectLayoutEvent = (state: LayoutTypeState): LayoutEventSchema => state.event;
export const selectModalNotification = (state: LayoutTypeState): NotificationUI | undefined => state.context.modalNotification;

/** StateMachineAppActive */
export const selectAppActive = (state: AppTypeState): AppActiveState => state.value;
export const selectAppActiveEvent = (state: AppTypeState): AppActiveEvent => state.event.type;
export const selectStore = (state: AppTypeState): StoreState => state.context.storeState;
export const selectSessionStore = (state: AppTypeState): SessionStoreState => state.context.sessionStoreState;
export const selectTabUuid = (state: AppTypeState): string => state.context.tabUuid;
/** StateMachineSettingsForm */
export const selectSettingsForm = (state: SettingsFormTypeState): SettingsFormState => state.value;
export const selectSettingsFormEvent = (state: SettingsFormTypeState): SettingsFormEvent => state.event.type;
export const selectSettingsFormData = (state: SettingsFormTypeState): SettingsFormContext => state.context;
/** StateMachineCitation */
export const selectCitation = (state: CitationTypeState): CitationState => state.value;
export const selectCitationData = (state: CitationTypeState): CitationContext => state.context;
/** StateMachineReferenceManager */
export const selectReferenceManager = (state: ReferenceManagerTypeState): ReferenceManagerState => state.value;
export const selectReferenceManagerEvent = (state: ReferenceManagerTypeState): ReferenceManagerEvent => state.event.type;
export const selectResources = (state: ReferenceManagerTypeState) => state.context.resources;
export const selectReferenceResource = (state: ReferenceManagerTypeState): DigitalResource | undefined =>
  state.context.referenceResource;
/** StateMachineCitation */
export const selectHighlightAndAnnotate = (state: HighlightAndAnnotateTypeState): HighlightAndAnnotateState => state.value;
export const selectHighlightAndAnnotateData = (state: HighlightAndAnnotateTypeState): HighlightAndAnnotateContext =>
  state.context;
