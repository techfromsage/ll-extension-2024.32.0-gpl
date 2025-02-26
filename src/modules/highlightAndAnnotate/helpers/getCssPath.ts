import ShadowList from '@/enums/ShadowList';

/**
 * Generates a CSS path selector for a given DOM element by traversing
 * up the DOM tree and constructing a unique `nth-of-type` selector for
 * each element.
 *
 * @param {Element} el - The DOM element to generate the CSS path for.
 * @returns {string} - The full CSS path for the element.
 */
const getCssPath = (el: Element): string => {
  // Return early if the input is not a valid DOM Element
  if (!(el instanceof Element)) {
    return '';
  }

  if (!el.parentElement || el.parentElement.nodeType !== Node.ELEMENT_NODE) {
    return 'html>body';
  }

  const path = [];

  // Recursively builds the CSS path for the given element.
  const buildPath = (element:Element) => {
    // Get the tag name of the element in lowercase
    const selector = element.nodeName.toLowerCase();

    // Calculate the nth-of-type by finding all siblings with the same tag name
    const nth = element.parentNode
      ? [...element.parentNode.children]
        .filter(sibling =>
          sibling.nodeName.toLowerCase() === selector && sibling.id !== ShadowList.Wrapper)
        .indexOf(element) + 1
      : 1;

    // Add the selector with nth-of-type to the beginning of the path array
    path.unshift(`${selector}:nth-of-type(${nth})`);

    // Recursively move up the DOM tree to the parent node
    if (element.parentNode && element.parentNode instanceof Element) {
      buildPath(element.parentNode);
    }
  };

  buildPath(el);

  // Replace the first two elements with 'html' and 'body' for the root of the document
  path[0] = 'html';
  path[1] = 'body';

  // Return the full CSS path as a string
  return path.join('>');
};

export default getCssPath;
