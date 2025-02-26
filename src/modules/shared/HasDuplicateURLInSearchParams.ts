/**
 * Check if there is a duplicated url in search param, and if there is return true.
 * @param  {string} url
 * @returns {boolean}
 */

const HasDuplicateURLInSearchParams = (url: string): boolean => {
  const urls = url.match(/(?:https?:\/\/|www\.)[^\s%]+/g);
  // Check for duplicates
  if (urls) {
    const uniqueURLs = new Set(urls);
    if (uniqueURLs.size !== urls.length) {
      return true; // Duplicate URLs found
    }
  }
  return false; // No duplicate URLs found
};

export default HasDuplicateURLInSearchParams;
