const parentElements = (node: Node | null, parents: Node[] = []): Node[] => {
  if (!node) {
    return parents;
  }

  return parentElements(node.parentNode, [node, ...parents]);
};

/**
 * Finds the common ancestor of two DOM nodes.
 *
 * @param {Node} node1 - The first DOM node.
 * @param {Node} node2 - The second DOM node.
 * @returns {Node | null} The common ancestor of the two nodes, or null if no common ancestor is found.
 */
const findCommonAncestor = (node1: Node, node2: Node): Node | null => {
  // If both nodes are the same, return the node itself as the common ancestor.
  if (node1 === node2) {
    return node1;
  }

  // Get the list of parent elements (including the node itself) for both nodes.
  const parents1 = parentElements(node1);
  const parents2 = parentElements(node2);

  /**
   * Recursively finds the common ancestor by comparing parent nodes at each index.
   *
   * @param {number} index - The current index in the parent arrays being compared.
   * @returns {Node | null} The common ancestor, or null if none is found.
   */
  const getCommonAncestor = (index: number): Node | null => {
    // Base case: stop if one list of parents runs out or the parents differ at the current index.
    if (index >= parents1.length || index >= parents2.length || parents1[index] !== parents2[index]) {
      // If no match is found at index 0, return null. Otherwise, return the last matching parent.
      return index === 0 ? null : parents1[index - 1];
    }

    // Recursive case: move to the next parent in both arrays and continue the comparison.
    return getCommonAncestor(index + 1);
  };

  // Start comparing parents from index 0.
  return getCommonAncestor(0);
};

export default findCommonAncestor;
