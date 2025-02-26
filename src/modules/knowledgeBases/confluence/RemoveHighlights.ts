/**
 * Removes Confluence specific Highlight syntax Confluence from text.
 */
export default (str: string): string => str
  .replace(/@@@hl@@@/ig, '')
  .replace(/@@@endhl@@@/ig, '');
