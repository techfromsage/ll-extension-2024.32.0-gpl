/**
 * Parses the hash component of a URL and returns relevant data;
 * specifically the Google Scholar ID; eg `uAF4WIXthisJ`
 *
 * @param {Location} url - The URL object from which to extract the hash.
 * @returns {Object} An object containing the parsed data from the hash.
 */
export default (url: Location | URL) => {
  const hash = decodeURIComponent(url.hash);
  const match = hash.match(/info:(.*?):/);
  if (match) {
    return match[1];
  }
  return undefined;
};
