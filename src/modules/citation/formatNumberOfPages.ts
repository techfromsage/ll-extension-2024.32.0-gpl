/**
 * Takes a range of pages (e.g. 1005-1008) and returns the number of pages (e.g. 3).
 * If the pages are not in the usual format (e.g. e1234) or undefined, it returns undefined.
 *
 * @param {string | undefined} pages
 * @returns {number | undefined}
 */
const formatNumberOfPages = (pages: string | undefined) => pages?.split('-').map(Number).reduce((a, b) => b - a) || undefined;

export default formatNumberOfPages;
