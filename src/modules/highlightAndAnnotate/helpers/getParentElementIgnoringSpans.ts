/**
 * Get the parent element of a node, ignoring any span elements.
 *
 * @param {Node} el - The node to start from
 * @returns {HTMLElement | null} The parent element of the node, ignoring any span elements, or null if no parent is found
 */

const getParentElementIgnoringSpans = (el: Node | null): HTMLElement | null => {
  // Helper function to check if the element is a span
  const isSpanElement = (element: HTMLElement): boolean => {
    return element.nodeType === 1 && element.nodeName.toUpperCase() === 'SPAN';
  };

  // Helper function to check if the element has the class 'f1000-at-ignore'
  const hasIgnoreClass = (element: HTMLElement): boolean => {
    return element.classList.contains('f1000-at-ignore');
  };

  // Recursive function to traverse up the DOM tree
  const findParent = (element: HTMLElement | null): HTMLElement | null => {
    if (!element) {
      return null;
    }

    if (!isSpanElement(element) && element.nodeType === 1 && !hasIgnoreClass(element)) {
      return element;
    }

    return findParent(element.parentNode as HTMLElement);
  };

  return findParent(el as HTMLElement);
};

export default getParentElementIgnoringSpans;
