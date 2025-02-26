import Annotation from '@/interfaces/highlightAndAnnotate/Annotation';
import findTextNodesWithinRange from './findTextNodesWithinRange';
import wrapTextNodeWithSpan from './wrapTextNodeWithSpan';

const wrapMultipleNodes = (
  range: Range,
  selection?: Selection,
  existingAnnotation?: Annotation,
) => {
  const textNodes = findTextNodesWithinRange(range);

  // Here we will store the first and last span elements, which are needed to restore the selection
  const spans = textNodes.map((textNode, index) => {
    if (index === 0) {
      // if the text node is the first one, we need to split the text node
      return wrapTextNodeWithSpan(textNode, 'first', range.startOffset, existingAnnotation);
    }

    if (index > 0 && index < textNodes.length - 1) {
      // if the text node is in the middle, we just need to wrap the text node
      wrapTextNodeWithSpan(textNode, 'middle', 0, existingAnnotation);
      return null; // Return null for middle nodes as they don't need to be added to spans
    }

    if (index === textNodes.length - 1) {
      // if the text node is the last one, we need to split the text node
      return wrapTextNodeWithSpan(textNode, 'last', range.endOffset, existingAnnotation);
    }

    return null; // Default return value
  }).filter(Boolean); // Filter out null values

  if (spans[0].firstChild && spans[1].firstChild?.textContent) {
    selection?.removeAllRanges();
    const newRange = document.createRange();
    newRange.setStart(spans[0].firstChild, 0); // Start from the first character of the first span
    newRange.setEnd(spans[1].firstChild, spans[1].firstChild?.textContent?.length); // End at the last character of the last span

    selection?.addRange(newRange);
  }
};

export default wrapMultipleNodes;
