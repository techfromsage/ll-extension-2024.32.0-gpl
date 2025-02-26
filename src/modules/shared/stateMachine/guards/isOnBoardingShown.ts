/**
 * Returns true if the onboarding is shown and sciwheel is enabled
 * @param isOnBoardingShown
 *   The onboarding is shown
 *  @type {boolean}
 * @param sciwheelEnabled
 *  The sciwheel is enabled
 * @type {boolean | string}
 * @param institutionsLength
 *  The length of the institutions
 *  @type {number | null}
 * @returns {boolean}
 */

export default (isOnBoardingShown: boolean, sciwheelEnabled: boolean | string, institutionsLength: number | null): boolean => {
  if (institutionsLength !== 1) {
    return false;
  }
  return !!(isOnBoardingShown && sciwheelEnabled);
};
