/**
 * PlatformGoogleScholar checks if an url is the Google Scholar URL or not
 * @param {string} url
 * @returns {boolean}
 */
export default (url: string): boolean => {
  return /scholar\.google\.(.*)\/scholar/.test(url);
};
