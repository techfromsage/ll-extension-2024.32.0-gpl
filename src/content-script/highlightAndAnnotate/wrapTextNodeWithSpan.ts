import createShadowHighlightAndAnnotate from '@/components/Shadow/createShadowHighlightAndAnnotate';
import Annotation from '@/interfaces/highlightAndAnnotate/Annotation';
import prepareSpanElement from './prepareSpanElement';

type Position = 'first' | 'middle' | 'last';

/**
 * Function to wrap a text node with a span element.
 *
 * @param {Node} textNode - The text node to wrap
 * @param {Position} position - The position of the text node
 * @param {Number} offset - The offset to split the text node at
 *
 * @param color
 * @returns {HTMLSpanElement | null}
 */
const wrapTextNodeWithSpan = (
  textNode: Node,
  position: Position,
  offset: number,
  existingAnnotation?: Annotation,
): HTMLSpanElement | null => {
  const { textContent, parentElement } = textNode;

  // Safety check
  if (!textContent || !parentElement) {
    return null;
  }

  // Create new span and text nodes
  const span = prepareSpanElement(existingAnnotation);

  const handleSpanByPosition = {
    // If the position is 'first', we need to split the text node
    first: () => {
      const selectedText = textContent.slice(offset);
      const remainingText = textContent.slice(0, offset);

      span.textContent = selectedText;

      parentElement.insertBefore(document.createTextNode(remainingText), textNode);
      parentElement.insertBefore(span, textNode.nextSibling);
    },
    // If the position is 'middle', we just need to wrap the text node
    middle: () => {
      span.textContent = textContent;
      parentElement.insertBefore(span, textNode);
    },
    // If the position is 'last', we need to split the text node
    last: () => {
      const selectedText = textContent.slice(0, offset);
      const remainingText = textContent.slice(offset);

      span.textContent = selectedText;
      if (!existingAnnotation) {
        createShadowHighlightAndAnnotate(span, selectedText);
      } else {
        // TODO: create shadow element to open AnnotationCard
      }

      parentElement.insertBefore(span, textNode);
      parentElement.insertBefore(document.createTextNode(remainingText), textNode);
    },
  };

  // Invoke the appropriate function based on the position
  handleSpanByPosition[position]();

  // Remove the original text node
  parentElement.removeChild(textNode);

  return span;
};

export default wrapTextNodeWithSpan;
