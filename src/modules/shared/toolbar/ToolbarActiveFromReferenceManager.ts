import ReferenceManagerState from '@/enums/stateMachine/ReferenceManagerState';
import ToolbarActive from '@/interfaces/ui/ToolbarActive';

/**
 * Check if the Toolbar Icon should be active due to Reference Manager state.
 */
export default (
  referenceManagerValue: ReferenceManagerState,
  availableReferences: number,
): ToolbarActive => {
  const active = [
    ReferenceManagerState.ReferenceSinglePage,
    ReferenceManagerState.ReferenceSearchResults,
  ].includes(referenceManagerValue) && availableReferences > 0;
  return {
    active,
    value: active ? `${availableReferences}` : '',
    isDotOnly: false,
  };
};
