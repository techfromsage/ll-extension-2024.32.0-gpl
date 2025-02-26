/**
 * Calculates the concatenated text content of all nodes in the flatElement array
 * before the originalElement and adds that length to the provided offset.
 *
 * @param {Node[]} flatElement - The flat array of nodes.
 * @param {Element} originalElement - The original element to find the text content before.
 * @param {number} offset - The offset to add to the text content length.
 * @returns {TextContentBefore} The concatenated text content before the original element and the updated offset.
 */

interface TextContentBefore {
  textContentBefore: string,
  offset: number,
}

const getFlattenedElementTextAndOffset = (flatElement: Node[], originalElement: Element, offset: number): TextContentBefore => {
  const textContentBefore = flatElement
    .slice(0, flatElement.indexOf(originalElement)) // Get all elements before the original element
    .map(node => node.textContent) // Get the text content of each element
    .join(''); // Concatenate all text content

  return {
    textContentBefore,
    offset: textContentBefore.length + offset,
  };
};

export default getFlattenedElementTextAndOffset;
