/**
 * Truncates a string to a given amount, then adds an ellipses.
 *
 * @param {string} str
 * @param {number} num
 * @returns {string}
 */
export default (str: string, num = 140) => ((str.length > num) ? `${str.slice(0, num)}...` : str);
