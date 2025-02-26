import IsOptionsPage from '../IsOptionsPage';

/**
* Returns true if the sciwheel tutorial is shown and sciwheel is enabled
* @param currentLocation
* The current location
* @param extensionUrl
* The extension url
* @param user
* The user
* @type {string}
* @param isSciwheelTutorialShown
 *  @type {boolean}
 * @param sciwheelEnabled
 *  The sciwheel is enabled
 * @type {boolean}
 * @param institutionsLength
 * The institutions length
 * @type {number}
 * @returns {boolean}
 */

export default (
  currentLocation: URL,
  extensionUrl: URL,
  user: string | undefined,
  isSciwheelTutorialShown: boolean,
  sciwheelEnabled: boolean | string,
  institutionsLength: number | null,
): boolean => {
  const checkIfOptionsPage = IsOptionsPage(currentLocation, extensionUrl);
  if (!checkIfOptionsPage || institutionsLength !== 1 || user) {
    return false;
  }
  return !!(isSciwheelTutorialShown && sciwheelEnabled);
};
