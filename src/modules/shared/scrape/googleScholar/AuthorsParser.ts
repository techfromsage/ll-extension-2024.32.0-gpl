/**
 * Extracts the author's surnames from the Google Scholar author's element.
 * e.g. given the string
 *    "D Grohl, T Hawkins - 1996 - books.google.com"
 * returns the array
 *    ['grohl', 'hawkins']
 *
 * @param {string} raw
 * @returns {string[]}
 */
export default (raw: string): string[] => {
  const [textBeforeHyphen] = raw
    .replace(/(…)|(\.\.\.)/g, ' ') // remove any '…' OR '...'
    .replace(/\s+/g, ' ') // replace all spaces with a single *regular* whitespace
    .match(/^(.*?) -/g) || [];

  const listOfAuthors = textBeforeHyphen?.trim().split(', ');
  if (!listOfAuthors) {
    return [];
  }
  return listOfAuthors.map(
    author => author
      .replace(/[A-Z]+ /g, '') // remove any first initial(s)
      .replace(/-.*/g, '') // hyphenated names, just want the first name
      .trim()
      .replace(/ .*/g, '') // multiple names, just want the first name
      .toLowerCase(),
  ).filter(Boolean);
};
