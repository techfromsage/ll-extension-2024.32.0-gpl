/**
 * Checks if the currentUrl is a site homepage
 *
 * @param {URL} currentUrl
 * @returns {boolean}
 */
export default (currentUrl: URL): boolean => {
  const { pathname } = currentUrl;
  return pathname === '/';
};
