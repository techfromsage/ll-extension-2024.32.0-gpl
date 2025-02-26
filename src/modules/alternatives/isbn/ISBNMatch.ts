const REGEX_ISBN = /\b((978|979)[-\s]?)?(([\dX][-\s]?){10})(?!\S)\b/ig;

const all = (text: string | string[]): string[] => {
  const textString = Array.isArray(text) ? text.join() : text;
  const matches = (textString?.match(REGEX_ISBN) || [])
    .filter(Boolean)
    .map(decodeURIComponent)
    .map(str => (str.toUpperCase()).trim());
  // We want an array of unique items.
  // Currently, the suggested method is to create a Set and then turn back into an array.
  return [...new Set(matches)];
};

const ISBNMatch = {
  all,
  first(text: string | string[]): string {
    return all(text)[0] || '';
  },
};
export default ISBNMatch;
