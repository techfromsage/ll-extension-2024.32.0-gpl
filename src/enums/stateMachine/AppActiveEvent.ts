/**
 * AppActiveEvent is used to represent and standardise the events that can be triggered in the App On/Off State Machine.
 */
enum AppActiveEvent {
  Init = 'xstate.init',
  Toggle = 'toggle',
  Off = 'off',
  On = 'on',
  ShowPinTooltipOnboardingTab = 'showPinTooltipOnboardingTab',
  ShowSciwheelOnboardingTab = 'showSciwheelOnboardingTab',
  RefreshStoreState = 'refreshStoreState',
  RefreshSessionStoreState = 'refreshSessionStoreState',
  RedeterminePage = 'redeterminePage',
  UpdateInstitutions = 'updateInstitutions',
  StoreDigitalResourceIds = 'storeDigitalResourceIds',
}

export default AppActiveEvent;
