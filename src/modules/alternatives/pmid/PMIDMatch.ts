/**
 * Finds first unique PMID in a body of text.
 */
const REGEX_PMID = /\b(\d{7,8}|PMC\d{7})\b/gi;

const all = (text: string | string[]): string[] => {
  const textString = Array.isArray(text) ? text.join() : text;
  const matches = (textString.match(REGEX_PMID) || [])
    .filter(Boolean)
    .map(decodeURIComponent);
  // We want an array of unique items.
  // Currently, the suggested method is to create a Set and then turn back into an array.
  return [...new Set(matches)];
};

const PMIDMatch = {
  all,
  first(text: string | string[]): string {
    return all(text)[0] || '';
  },
};
export default PMIDMatch;
