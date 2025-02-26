/**
 * React Context for providing values from StateMachineSettingsForm.
 */
import { createContext } from 'react';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import SettingsFormState from '@/enums/stateMachine/SettingsFormState';
import { SettingsFormContext } from '@/modules/shared/stateMachine/StateMachineSettingsForm';
import defaultAppSettings from '@/store/shared/appSettings/defaultAppSettings';

const sendSettingsFormsState: (value: SettingsFormEvent, payload?: Record<string, any>) => void = () => {
  /* Empty default function */
};

interface ContextProps {
  settingsFormValue: SettingsFormState,
  settingsFormEvent: SettingsFormEvent,
  settingsFormData: SettingsFormContext,
  sendSettingsFormsState: (value: SettingsFormEvent, payload?: Record<string, any>) => void,
}

const settingsFormData: SettingsFormContext = {
  appSettings: defaultAppSettings,
  enabledItems: defaultAppSettings,
  institutions: [],
  alert: [],
} as unknown as SettingsFormContext;

export interface SettingsFormDefaultValues {
  settingsFormValue: SettingsFormState,
  settingsFormEvent: SettingsFormEvent,
  settingsFormData: SettingsFormContext,
  sendSettingsFormsState: (value: SettingsFormEvent, payload?: Record<string, any>) => void,
}

export const settingsFormDefaultValues: SettingsFormDefaultValues = {
  settingsFormValue: SettingsFormState.Ready,
  settingsFormEvent: SettingsFormEvent.Init,
  settingsFormData,
  sendSettingsFormsState,
};
const SettingsFormReactContext = createContext<ContextProps>(settingsFormDefaultValues);

export default SettingsFormReactContext;
