import { SettingsFormContext, SettingsFormEventSchema } from '@/modules/shared/stateMachine/StateMachineSettingsForm';
import browserMethods from '@/browserMethods';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import AppActiveEvent from '@/enums/stateMachine/AppActiveEvent';
import setValue from 'lodash.set';

const submitInstitutions = (institutionIds: string[], resolve: () => void) => {
  window.stateInterpreterAppActive.send(AppActiveEvent.UpdateInstitutions, { institutionIds });
  resolve();
};

const submitValue = (settingName: string, value: string, resolve: () => void, withoutRefresh = false) => {
  const userPreference = setValue({}, settingName, value);
  browserMethods.app.contentScript.updateUserPreferences(userPreference).then(storeState => {
    if (withoutRefresh) {
      resolve();
      return;
    }

    window.stateInterpreterSettingsForm.send(SettingsFormEvent.AppSettingsUpdated, { settingName });
    window.stateInterpreterAppActive.send(AppActiveEvent.RefreshStoreState, { storeState });
    resolve();
  });
};

/**
 * The 'onSubmit' callback is run form the StateMachineSettingsForm when the form is submitted.
 * It handles sending the updated form values to the background to update.
 * It then notifies the relevant StateMachines of any state changes.
 */
export default (context: SettingsFormContext, event: SettingsFormEventSchema): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (event.type !== SettingsFormEvent.Submit) {
      reject();
      return;
    }

    if (event.name === 'institutions') {
      submitInstitutions(event.value, resolve);
      return;
    }

    const [value] = event.value;
    submitValue(event.name, value, resolve, event.withoutRefresh);
  });
};
