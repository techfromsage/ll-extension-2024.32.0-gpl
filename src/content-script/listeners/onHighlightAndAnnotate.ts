import HighlightAndAnnotateContext from '@/interfaces/stateMachine/HighlightAndAnnotateContext';
import wrapSelectedText from '@/content-script/highlightAndAnnotate/wrapSelectedText';
import HighlightAndAnnotateEvent from '@/enums/stateMachine/HighlightAndAnnotateEvent';
import { HighlightAndAnnotateEventSchema } from '@/modules/shared/stateMachine/StateMachineHighlightAndAnnotate';
import ShadowList from '@/enums/ShadowList';
import replaceSpanWithText from '@/modules/highlightAndAnnotate/helpers/replaceSpanWithText';

/**
 * Listener callback - runs when highlight and annotate is on.
 * Register the event listener for mouseup to wrap the selected text in a span.
 */
export default async (context: HighlightAndAnnotateContext, event: HighlightAndAnnotateEventSchema) => {
  if (event.type === HighlightAndAnnotateEvent.Init || event.type === HighlightAndAnnotateEvent.TurnOn) {
    window.document.removeEventListener('mouseup', wrapSelectedText);
    window.document.addEventListener('mouseup', wrapSelectedText);
  }

  if (event.type === HighlightAndAnnotateEvent.TurnOff) {
    window.document.removeEventListener('mouseup', wrapSelectedText);
    // remove the highlight spans and leave the text
    window.document.querySelectorAll(`.${ShadowList.HighlightAndAnnotateElement}`).forEach(element => {
      const span = element as HTMLSpanElement;
      replaceSpanWithText(span);
    });
  }
};
