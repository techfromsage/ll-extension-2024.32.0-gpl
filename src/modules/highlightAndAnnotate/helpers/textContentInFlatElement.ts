import trimSpecialChars from './trimSpecialChars';

/**
 * Extracts the container text and the offset from the flat element array.
 *
 * @param {Element[]} flatElement - The flat element array
 * @param {Node} node - The node that contains the text - anchorNode or focusNode
 * @param {number} offset - The offset - anchorOffset or focusOffset
 * @param {string} textBefore - The text before
 * @returns {TextContent} The container text and the offset
 */

interface TextContent {
  containerText: string,
  offset: number,
}

// Constant for maximum length of container text
const MAX_LENGTH = 64;

const textContentInFlatElement = (
  flatElement: Element[],
  node: Node,
  offset: number,
  textBefore: string,
): TextContent => {
  const containerText = node.textContent || '';
  let newOffset = offset;

  // Calculate the missing length to reach the maximum length
  const missingLength = MAX_LENGTH - containerText.length;

  if (missingLength > 0) {
    // Expand backward
    const trimmedTextBefore = textBefore.length > missingLength
      ? textBefore.slice(-missingLength)
      : textBefore;

    // Update container text and new offset after expanding backward
    const updatedContainerText = trimmedTextBefore + containerText;
    newOffset = trimmedTextBefore.length + newOffset;

    // Expand forward
    const forwardText = flatElement
      .slice(flatElement.indexOf(node as Element) + 1)
      .map(element => element.textContent || '')
      .join('');

    const trimmedTextAfter = forwardText.length > missingLength
      ? forwardText.slice(0, missingLength)
      : forwardText;

    return trimSpecialChars({
      containerText: updatedContainerText + trimmedTextAfter,
      offset: newOffset,
    });
  }

  // If missing length is less than zero, handle the discard case
  const trimmedContainerText = newOffset <= MAX_LENGTH
    ? containerText.slice(0, MAX_LENGTH)
    : containerText.slice(newOffset - MAX_LENGTH, newOffset);

  return trimSpecialChars({
    containerText: trimmedContainerText,
    offset: Math.min(newOffset, MAX_LENGTH), // Ensure newOffset does not exceed MAX_LENGTH
  });
};

export default textContentInFlatElement;
