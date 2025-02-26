import HighlightAndAnnotateState from '@/enums/stateMachine/HighlightAndAnnotateState';

type HighlightAndAnnotateStateResponse =
  | { status: HighlightAndAnnotateState.Success }
  | { status: HighlightAndAnnotateState.Error };

export default HighlightAndAnnotateStateResponse;
