/**
 * PlatformScite checks if an url is the Scite AI URL or not.
 * @param {string} url
 * @returns {boolean}
 */
export default (url: string): boolean => {
  return /scite\.ai\/(.*)/.test(url);
};
