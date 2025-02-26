import IsOptionsPage from '../IsOptionsPage';

/**
 * Determines whether the pin tooltip tutorial is shown.
 *
 * @param {Location} currentLocation - The current location.
 * @param {URL} extensionUrl - The URL of the extension.
 * @param {boolean} isPinTooltipTutorialShown - Indicates whether the pin tooltip tutorial is shown.
 * @param {number | null} institutionsLength - The length of the institutions.
 * @returns {boolean} - Returns true if the pin tooltip tutorial is shown, otherwise false.
 */
export default (
  currentLocation: URL,
  extensionUrl: URL,
  isPinTooltipTutorialShown: boolean,
  institutionsLength: number | null,
): boolean => {
  const isOptionsPage = IsOptionsPage(currentLocation, extensionUrl);
  if (!isOptionsPage || institutionsLength !== 1) {
    return false;
  }
  return !!(isPinTooltipTutorialShown);
};
