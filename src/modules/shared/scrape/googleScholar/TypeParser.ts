import DigitalResourceType from '@/enums/DigitalResourceType';
/**
 * Extracts the item type from the Google Scholar title element.
 * e.g. the string
 *    <h3><a href="">[EBook]Some great title</a></h3>
 * returns the string:
 *    'ebook'
 *
 * @param {string} raw
 * @returns {string}
 */

export default (raw: string): DigitalResourceType => {
  const bracketRegex = /^\[.*\]/g;
  const [stringBracket] = raw.replace(/\s+/g, '').match(bracketRegex) || [];
  const type = stringBracket ? stringBracket.toLowerCase() : '';

  if (type.includes('book') || type.includes('ebook')) {
    return DigitalResourceType.EBook;
  }

  return DigitalResourceType.Article;
};
