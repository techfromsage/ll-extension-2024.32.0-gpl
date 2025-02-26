/**
 * Takes a url, searchString, and array of items and builds a URL to be consumed by the browser.
 * As a result, it is limited to 2000 characters, items are checked before they are added
 * @param  {string} url
 * @param  {string} searchString
 * @param  {string[]} items
 * @returns string
 */
export default (url: string, searchString: string, keyword: string, items: string[]): string => {
  const decodedUrl = decodeURIComponent(url);
  const urlSearchSchema = '{search_string}';

  // if url does not contain {search_string} then return empty string, providing no url
  if (!decodedUrl.includes(urlSearchSchema) || !searchString.includes(`{${keyword}}`)) {
    return '';
  }

  const urlSchemaMax = 2000;
  const maxLen = urlSchemaMax - decodedUrl.length;
  const generatedString = items.reduce((acc, item) => {
    const newPart = searchString.replace(`{${keyword}}`, item);
    if (acc.length + newPart.length > maxLen) {
      return acc;
    }
    return acc + newPart;
  }, '');

  // if generatedString ends in +OR+ then remove it
  if (generatedString.endsWith('+OR+')) {
    return decodedUrl.replace(urlSearchSchema, generatedString.slice(0, -4));
  }

  return decodedUrl.replace(urlSearchSchema, generatedString);
};
