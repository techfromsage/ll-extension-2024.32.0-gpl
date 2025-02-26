import LocationOption from '@/enums/LocationOption';

/**
 * Filter function returns true if allowed to be shown on-campus.
 * @param {LocationOption} showOption
 * @returns {boolean}
 */
const checkIfAllowedOnCampus = (showOption: LocationOption): boolean =>
  [LocationOption.OnCampus, LocationOption.OnAndOffCampus, LocationOption.DiffBetweenOnAndOffCampus].includes(showOption);

/**
 * Filter function returns false if can be shown off-campus.
 * @param {LocationOption} showOption
 * @returns {boolean}
 */
const checkIfAllowedOffCampus = (showOption: LocationOption): boolean =>
  [LocationOption.OffCampus, LocationOption.OnAndOffCampus, LocationOption.DiffBetweenOnAndOffCampus].includes(showOption);

/**
 * Checks if a given Location Option is allowed for the user's current location.
 * e.g. For an assist message for on campus only, only show to on campus users.
 *
 * @param {LocationOption} show
 * @param {boolean} isCurrentlyOnCampus
 * @returns {boolean}
 */
export default (show: LocationOption, isCurrentlyOnCampus: boolean) => {
  return isCurrentlyOnCampus ? checkIfAllowedOnCampus(show) : checkIfAllowedOffCampus(show);
};
