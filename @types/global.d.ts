/**
 * Global variables for use in the app.
 */
import { StateInterpreterLayout } from '@/modules/shared/stateMachine/StateMachineLayout';
import { StateInterpreterAppActive } from '@/modules/shared/stateMachine/StateMachineAppActive';
import { StateInterpreterSettingsForm } from '@/modules/shared/stateMachine/StateMachineSettingsForm';
import { StateInterpreterLibrarySearch } from '@/modules/shared/stateMachine/StateMachineLibrarySearch';
import State from '@/enums/State';
import { StateInterpreterKeywordEnhancements } from '@/modules/shared/stateMachine/StateMachineKeywordEnhancements';
import { StateInterpreterCitation } from '@/modules/shared/stateMachine/StateMachineCitation';
import { StateInterpreterReferenceManager } from '@/modules/shared/stateMachine/StateMachineReferenceManager';
import { StateInterpreterHighlightAndAnnotate } from '@/modules/shared/stateMachine/StateMachineHighlightAndAnnotate';

declare global {
  interface Window {
    notificationsState: State,
    stateInterpreterLayout: StateInterpreterLayout,
    stateInterpreterAppActive: StateInterpreterAppActive,
    stateInterpreterSettingsForm: StateInterpreterSettingsForm,
    stateInterpretersLibrarySearch: StateInterpreterLibrarySearch[],
    stateInterpreterKeywordEnhancements: StateInterpreterKeywordEnhancements[],
    stateInterpreterCitation: StateInterpreterCitation,
    stateInterpreterReferenceManager: StateInterpreterReferenceManager,
    stateInterpreterHighlightAndAnnotate: StateInterpreterHighlightAndAnnotate,
  }

  /**
   * Session storage is available from Firefox 115 (and all other browsers) but the library (@types/firefox-webext-browser)
   * we use to give us Typescript types is only at version 109. Right now, we have to manually tell TS about the session
   * storage.
   *
   * This can be removed when https://www.npmjs.com/package/@types/firefox-webext-browser version 115+ is released.
   */
  declare namespace browser.storage {
    const session: StorageArea;
  }

}
