import getLocationOrigin from './getLocationOrigin';

/**
 * Extract and normalize the secondary image source.
 *
 * @param {HTMLImageElement} element - The image element
 * @returns {string} The normalized secondary image source
 */
const getFullSizeImageSrc = ({ src, attributes }: HTMLImageElement) => {
  // Find the first attribute that contains 'src', isn't 'srcset', and has a valid name
  const secondarySrc = Array.from(attributes)
    .find(({ name }) => name.length > 3 && name !== 'srcset' && /src/i.test(name))
    ?.value || src; // Default to the primary source (src) if no valid secondary source is found

  // Normalize the secondary source URL if it's not a data URL
  if (secondarySrc.startsWith('data:image')) {
    return secondarySrc; // Return the original if it's a data URL
  }

  // Check if secondarySrc is an absolute URL
  const isAbsoluteUrl = /^(\/\/|https?:\/\/)/.test(secondarySrc);
  if (isAbsoluteUrl) {
    // If it's already an absolute URL, return it as is
    return secondarySrc;
  }

  // Otherwise, normalize to an absolute path
  const addSlash = secondarySrc.startsWith('/') ? '' : '/';
  return `${getLocationOrigin()}${addSlash}${secondarySrc}`; // Otherwise, prepend the origin
};

export default getFullSizeImageSrc;
