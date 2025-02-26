/**
 * Interface OnCampus tracks if a user is on or on campus for their institutions.
 * True is on, false is off.
 * e.g.
 * User is on campus for Institution 45
 * {
 *   '45': true,
 * }
 */
interface OnCampus {
  [institution: string]: boolean,
}

export default OnCampus;
