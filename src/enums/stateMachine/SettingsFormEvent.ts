/**
 * SettingsFormEvent is used to represent and standardise the events that can be triggered in settings form.
 */
export enum SettingsFormEvent {
  Init = 'xstate.init',
  Submit = 'submit',
  InstitutionsUpdated = 'institutionsUpdated',
  AppSettingsUpdated = 'appSettingsUpdated',
  RefreshStoreState = 'refreshStoreState',
}

export default SettingsFormEvent;
