/**
 * Given two arrays, return the elements which are in both.
 *
 * @param {T[]} a
 * @param {T[]} b
 * @returns {T[]}
 */
export default <T>(a: T[], b: T[]) => a.filter(x => b.includes(x));
