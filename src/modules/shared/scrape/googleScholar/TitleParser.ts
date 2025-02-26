/**
 * Extracts the Article/Book title from the Google Scholar title element.
 * e.g. the string
 *    <h3><a href="">Some great title</a></h3>
 * returns the string:
 *    'Some great title'
 *
 * @param {string} raw
 * @returns {string}
 */
export default (raw: string) => {
  const bracketRegex = /^\[.*\]/g;

  return raw
    .replace(bracketRegex, '')
    .replace(/\s+/g, ' ') // remove multiple spaces
    .trim(); // remove leading + trailing whitespace
};
