/**
 * Function to get all text nodes within a selection range.
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Range)
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker)
 *
 * @param {Range} range
 * @returns {Node[]}
 */

const findTextNodesWithinRange = (range: Range): Node[] => {
  const textNodes: Node[] = [];

  const processNode = (currentNode: Node): void => {
    // Double check if the current node is a text node and part of the range
    if (currentNode.nodeType !== Node.TEXT_NODE) {
      return;
    }

    // Create a temporary range for the node to ensure it's within the selection
    const nodeRange = document.createRange();
    nodeRange.selectNodeContents(currentNode);

    // Ensure the node is partially or fully within the selection range
    if (
      range.compareBoundaryPoints(Range.END_TO_START, nodeRange) !== -1
      && range.compareBoundaryPoints(Range.START_TO_END, nodeRange) !== 1
    ) {
      return;
    }

    // Push the currentNode to the textNodes array if all checks pass
    textNodes.push(currentNode);
  };

  // Create a TreeWalker to traverse text nodes within the common ancestor
  const treeWalker = document.createTreeWalker(
    range.commonAncestorContainer,
    NodeFilter.SHOW_TEXT, // Only consider text nodes
    {
      acceptNode: node => {
        // Only accept nodes that are part of the selection range
        if (range.intersectsNode(node)) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_REJECT;
      },
    },
  );

  // Traverse through the text nodes
  for (
    let currentNode = treeWalker.nextNode();
    currentNode !== null;
    currentNode = treeWalker.nextNode()
  ) {
    processNode(currentNode);
  }

  return textNodes;
};

export default findTextNodesWithinRange;
