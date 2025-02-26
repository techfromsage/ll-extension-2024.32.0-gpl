/**
 * Sort function for object with path property
 * Sort objects by shortest path.
 */
interface WithPath {
  path: string,
}

/**
 * @param {WithPath} a
 * @param {WithPath} b
 * @returns {number} The sorting number
 */
export default (a: WithPath, b: WithPath): number => ((b.path.length > a.path.length) ? -1 : 1);
