/**
 * Checks if the current page is the options page.
 */
export default (currentLocation: URL, extensionUrl: URL) => {
  return currentLocation.href === `${extensionUrl.href}options.html`;
};
