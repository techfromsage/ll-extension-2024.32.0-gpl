const htmlEntitiesMap: { [key: string]: string } = {
  '&quot;': '"',
  '&apos;': "'",
  '&amp;': '&',
  '&gt;': '>',
  '&lt;': '<',
  '/': '/',
};

/*
  * Parse HTML entities in a string
 */
export default (input: string): string => {
  return Object.entries(htmlEntitiesMap).reduce((parsedInput, [key, value]) => {
    const re = new RegExp(key, 'g');
    return parsedInput.replace(re, value);
  }, input);
};
