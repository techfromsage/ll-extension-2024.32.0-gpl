import createShadowHighlightAndAnnotate from '@/components/Shadow/createShadowHighlightAndAnnotate';
import Annotation from '@/interfaces/highlightAndAnnotate/Annotation';
import prepareSpanElement from './prepareSpanElement';

const wrapSingleNode = (
  container: Node,
  startOffset: number,
  endOffset: number,
  selection?: Selection,
  existingAnnotation?: Annotation,
) => {
  const span = prepareSpanElement(existingAnnotation);

  // Split the text node into three parts: before, selected, after
  const beforeText = container.textContent ? container.textContent.slice(0, startOffset) : '';
  const selectedText = container.textContent ? container.textContent.slice(startOffset, endOffset) : '';
  const afterText = container.textContent ? container.textContent.slice(endOffset) : '';

  // Insert the span with the selected text
  span.textContent = selectedText;

  // Replace the original text node with the new nodes
  const { parentNode } = container;
  if (parentNode) {
    const beforeNode = document.createTextNode(beforeText);
    const afterNode = document.createTextNode(afterText);

    parentNode.insertBefore(beforeNode, container);
    parentNode.insertBefore(span, container);
    parentNode.insertBefore(afterNode, container);

    createShadowHighlightAndAnnotate(span, selectedText, existingAnnotation);

    parentNode.removeChild(container);

    // Restore selection to the new span
    if (selection && span.firstChild) {
      selection.removeAllRanges();
      const newRange = document.createRange();
      newRange.setStart(span.firstChild, 0); // Set start to the beginning of the span's text
      const textNode = span.firstChild as Text;
      newRange.setEnd(span.firstChild, textNode.length); // Set end to the end of the span's text
      selection.addRange(newRange);
    }
  }
};

export default wrapSingleNode;
