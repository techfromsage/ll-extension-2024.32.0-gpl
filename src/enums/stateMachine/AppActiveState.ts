/**
 * Represents the different states the app can be in.
 * Usually on or off, but also useful for initialising states etc...
 */
enum AppActiveState {
  Init = 'init',
  FetchBaseData = 'fetchBaseData',
  FetchInstitutionData = 'fetchInstitutionData',
  NoInstitutionsSelected = 'noInstitutionsSelected',
  ShowPinTooltipOnboardingTab = 'showPinTooltipOnboardingTab',
  ShowSciwheelOnboardingTab = 'showSciwheelOnboardingTab',
  GlobalDeny = 'globalDeny',
  Loading = 'loading',
  On = 'on',
  Off = 'off',
  DeterminingPage = 'determiningPage',
}

export default AppActiveState;
