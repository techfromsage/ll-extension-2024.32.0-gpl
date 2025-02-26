/**
 * XPath creates a simple way to run Xpath matches on a Document.
 *
 * @param {Document} document
 * @returns {{match(xpath: string): string[]} | string[]}
 */
export default (document: Document) => {
  return {
    match(xpath: string): string[] {
      const results = document.evaluate(xpath, document, null, window.XPathResult.ANY_TYPE, null);
      let node = results.iterateNext() as HTMLElement;
      let matches: string[] = [];
      do {
        matches = [...matches, node?.outerHTML || ''];
        node = results.iterateNext() as HTMLElement;
      } while (node);
      return matches.filter(Boolean);
    },
  };
};
