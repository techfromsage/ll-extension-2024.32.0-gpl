import flattenElement from './flattenElement';

/**
 * Recursively traverses the flat array of nodes to find the text node at the caretOffset position.
 *
 * @param {Text[]} nodes - Array of flattened text nodes from the caretElement.
 * @param {number} caretOffset - The caret's character offset within the element.
 * @param {number} currentIndex - Tracks the cumulative text length during traversal (starts at 0).
 * @returns The text node at the caret position, or null if not found or invalid position.
 */
const findNodeAtCaret = (nodes: Text[], caretOffset: number, currentIndex = 0): Text | null => {
  // Base case: no nodes left to check
  if (nodes.length === 0) {
    return null;
  }

  const [node, ...remainingNodes] = nodes; // Destructure the current node and the rest of the nodes

  const nodeLength = node.textContent ? node.textContent.length : 0; // Get the length of the current node
  const nextIndex = currentIndex + nodeLength;

  if (nextIndex >= caretOffset) {
    // If the caretOffset is within the current node, adjust caretOffset relative to the node
    const adjustedOffset = caretOffset - currentIndex;
    // Return the null if caretOffset is invalid
    if (adjustedOffset > nodeLength) {
      return null;
    }

    // Return the text node at the caret position
    return node.splitText(adjustedOffset);
  }

  // Recursive step: check the remaining nodes with the updated cumulative index
  return findNodeAtCaret(remainingNodes, caretOffset, nextIndex);
};

/**
 * Converts a caret position within an element (caretElement and caretOffset) to the corresponding text node.
 * It traverses the flattened text nodes recursively, calculating cumulative character lengths to find
 * the correct node and adjusts the caretOffset accordingly.
 *
 * @param caretElement - The element containing the caret.
 * @param caretOffset - The caret's character offset within the element.
 * @returns The text node at the caret position, or null if the position is invalid.
 */
const caretToNode = (caretElement: Element, caretOffset: number): Text | null => {
  // Flatten all nodes inside caretElement
  const flatNodes: Node[] = flattenElement(caretElement);

  // Filter to ensure we only have Text nodes
  const flat: Text[] = flatNodes.filter((node): node is Text => node instanceof Text);

  return findNodeAtCaret(flat, caretOffset); // Initiate the recursive search for the node at caretOffset
};

export default caretToNode;
