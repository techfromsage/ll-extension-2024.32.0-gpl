/**
 * Strips HTML/XML Tags from a string
 *
 * @param {string} str
 * @returns {string}
 */
export default (str: string) => str.replace(/<[^>]+>/g, '');
