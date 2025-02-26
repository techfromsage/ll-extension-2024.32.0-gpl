/**
 * Joins a Base Url with a path, taking into account slashes.
 * e.g.
 * - base url: https://leanlibrary.com/ + /path1 = https://leanlibrary.com/path1
 * - base url: https://leanlibrary.com + /path1 = https://leanlibrary.com/path1
 * - base url: https://leanlibrary.com + path1 = https://leanlibrary.com/path1
 *
 * @param {string} baseUrl
 * @param {string} path
 * @returns {string}
 */
export default (baseUrl: string, path: string): string =>
  `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
