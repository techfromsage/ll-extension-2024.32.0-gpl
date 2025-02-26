/**
 * Recursively flattens a node into an array of elements.
 *
 * @param {Node} node - The node to flatten.
 * @returns {Element[]} An array of elements in the node.
 */
const flattenElement = (node: Node): Element[] => {
  const flat: Element[] = [];

  const addChildNodesToFlatArray = (parentNode: Node): void => {
    if (!parentNode) {
      return;
    }

    if (parentNode.nodeType === Node.TEXT_NODE) {
      flat.push(parentNode as Element);
    } else {
      parentNode.childNodes.forEach(childNode => addChildNodesToFlatArray(childNode));
    }
  };

  addChildNodesToFlatArray(node);
  return flat;
};

export default flattenElement;
