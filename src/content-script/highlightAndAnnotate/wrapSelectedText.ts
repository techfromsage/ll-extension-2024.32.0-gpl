import ShadowList from '@/enums/ShadowList';
import formatSelectionObject from '@/modules/highlightAndAnnotate/helpers/formatSelectionObject';
import HighlightAndAnnotateEvent from '@/enums/stateMachine/HighlightAndAnnotateEvent';
import wrapMultipleNodes from './wrapMultipleNodes';
import wrapSingleNode from './wrapSingleNode';

/**
 * Function use the selected text and wrap a span element around it
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Selection)
 */
const wrapSelectedText = () => {
  const selection = window.getSelection();

  // exit if no selection
  // or selection is actually a click
  // or if range count is 0
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
    return;
  }

  const range = selection.getRangeAt(0);
  const {
    startContainer, endContainer, startOffset, endOffset,
  } = range;

  // Prevent re-running for empty or repeated selections
  if (range.startContainer.parentElement?.classList.contains(ShadowList.HighlightAndAnnotateElement)) {
    return;
  }

  // Save the selection to the state machine context for later use
  window.stateInterpreterHighlightAndAnnotate.send(HighlightAndAnnotateEvent.UpdateSelection, {
    pageData: {
      page: {
        uri: window.location.href,
      },
      selection: formatSelectionObject(selection),
    },
  });

  if (startContainer === endContainer) {
    wrapSingleNode(startContainer, startOffset, endOffset, selection);
  } else {
    wrapMultipleNodes(range, selection);
  }
};

export default wrapSelectedText;
