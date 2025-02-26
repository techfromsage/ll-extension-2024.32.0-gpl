import Annotation from '@/interfaces/highlightAndAnnotate/Annotation';
import deserializeRange from '@/modules/highlightAndAnnotate/helpers/deserializeRange';
import caretToNode from '@/modules/highlightAndAnnotate/helpers/caretToNode';
import flattenElement from '@/modules/highlightAndAnnotate/helpers/flattenElement';
import findCommonAncestor from '@/modules/highlightAndAnnotate/helpers/findCommonAncestor';
import isTextNode from '@/modules/highlightAndAnnotate/helpers/isTextNode';
import wrapSingleNode from '@/content-script/highlightAndAnnotate/wrapSingleNode';
import adjustIndexes from '@/modules/highlightAndAnnotate/helpers/adjustIndexes';

const highlightExistingAnnotation = (annotation: Annotation): void => {
  // Turn the annotation range object into a deserialized range object, and destructure the values
  const {
    anchorNodeParent,
    anchorOffset,
    focusNodeParent,
    focusOffset,
  } = deserializeRange(annotation);

  // exit early if the focusNodeParent or anchorNodeParent are null
  if (!anchorNodeParent || !focusNodeParent) {
    return;
  }

  const endNode = caretToNode(focusNodeParent, focusOffset);
  const startNode = caretToNode(anchorNodeParent, anchorOffset);

  // exit early if the startNode or endNode are null
  if (!startNode || !endNode) {
    return;
  }

  const commonAncestor = findCommonAncestor(startNode, endNode);

  // exit early if the commonAncestor is null
  if (!commonAncestor) {
    return;
  }

  const flatCommonAncestor = flattenElement(commonAncestor);

  // Extracts all the nodes between startNode and endNode (excluding endNode) from the flatCommonAncestor array.
  // The slice method returns a new array containing only the nodes within the specified range.
  // We process each node, wrapping it in a span element and applying styling.
  const startIndex = flatCommonAncestor.findIndex(node => isTextNode(node) && node === startNode);
  const endIndex = flatCommonAncestor.findIndex(node => isTextNode(node) && node === endNode);

  // For the backward selection, the startIndex will be greater than the endIndex.
  // So we want to ensure that the startIndex is less than the endIndex
  const [adjustedStartIndex, adjustedEndIndex] = adjustIndexes([startIndex, endIndex]);

  // exit early if the adjustedStartIndex or adjustedEndIndex are -1
  if (adjustedStartIndex === -1 || adjustedEndIndex === -1) {
    return;
  }

  flatCommonAncestor
    .slice(adjustedStartIndex, adjustedEndIndex)
    .forEach(node => {
      if (node.textContent && node.textContent.trim().length > 0) {
        wrapSingleNode(node, 0, node.textContent.length, undefined, annotation);
      }
    });
};

export default highlightExistingAnnotation;
