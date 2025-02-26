import createShadowKeywordEnhancements from '@/components/Shadow/createShadowKeywordEnhancements';
import { StateInterpreterKeywordEnhancements } from '@/modules/shared/stateMachine/StateMachineKeywordEnhancements';

/**
 * Get all text nodes within the elements we want to search.
 */
const textNodes = (document: Document) => {
  const targetTags = ['p', 'b', 'i', 'strong', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  const elements = [].slice.call(
    document.querySelectorAll(targetTags.join(',')),
  );

  // we filter out spans used for accessibility purposes on Wikipedia
  // that are hidden within this particular button
  // see https://newleanlibrary.atlassian.net/browse/LL-2634
  const filteredElements = elements.filter((element: HTMLElement) => !element.parentElement?.classList.contains('cdx-button'));

  return filteredElements.reduce(
    (nodes, element: HTMLElement) => nodes.concat(
      [].slice.call(element.childNodes).filter((node: Node) => node.nodeType === Node.TEXT_NODE),
    ),
    [],
  );
};

/**
 * Create a span element to "wrap around" our keyword
 *
 * @param packageName
 * @param keyword
 */
const createSpanElement = (packageName: string, keyword: string, document: Document) => {
  const span = document.createElement('span');
  span.setAttribute('data-package', packageName);
  span.setAttribute('data-keyword', keyword);
  span.setAttribute('data-testid', 'keyword-enhancement-highlight');
  span.style.all = 'unset';

  return span;
};

/**
 * Highlights the first occurrence of a keyword in the document, for each package keyword.
 *
 * @returns void
 * @param interpreter
 */
export default (interpreter: StateInterpreterKeywordEnhancements, document: Document) => {
  const { keywordPackage } = interpreter.getSnapshot().context;
  const nodes = textNodes(document);

  keywordPackage.keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword.name}\\b`, 'i');
    let matchFound = false;

    nodes.forEach(textNode => {
      // Break out of loop if match has already been found
      if (matchFound) {
        return;
      }

      const match = (textNode as HTMLElement).textContent?.match(regex);

      // highlight the keyword and create the shadow dom
      if (match) {
        const matchText = match[0];
        const matchStartIndex = match?.index ?? -1;
        const matchEndIndex = matchStartIndex + matchText.length;
        const span = createSpanElement(keywordPackage.name, matchText, document);
        const range = document.createRange();

        range.setStart(textNode, matchStartIndex);
        range.setEnd(textNode, matchEndIndex);

        const fragment = range.extractContents();
        fragment.childNodes.forEach(node => span.appendChild(node));

        range.insertNode(span);

        createShadowKeywordEnhancements(span, interpreter, keyword, matchText);

        // match found, exit the loop
        matchFound = true;
      }
    });
  });
};
