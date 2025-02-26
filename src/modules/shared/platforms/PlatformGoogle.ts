/**
 * PlatformGoogle checks if an url is the Google Search URL or not
 * @param {string} url
 * @returns {boolean}
 */

export default (url: string): boolean => {
  return /google\.(.*)\/search/.test(url) && !/google\.(.*)\/maps/.test(url);
};
