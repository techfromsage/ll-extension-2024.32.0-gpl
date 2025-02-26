import getFullSizeImageSrc from './getFullSizeImageSrc';

/**
 *
 * @param {Range} rangeContents - the current window.getSelection().getRangeAt(0).cloneContents()
 * @returns Images sources array - original src attribute and full-size image source
 */

// Area threshold used to filter out images smaller than 1024 pixels in area
const IMAGE_AREA_THRESHOLD = 1024;

const getRangeImages = (rangeContents:DocumentFragment): { src: string, full: string }[] => {
  // Select all 'img' elements within the provided range
  const imageElements = rangeContents.querySelectorAll('img');

  // Filter out images that meet the size condition and return an array of image objects
  return Array.from(imageElements)
    .filter(({ width, height }) => width * height > IMAGE_AREA_THRESHOLD) // Only process images larger than 1024 pixels in area
    .map(element => {
      // Extract the image source
      const { src } = element;

      // Get the full size (secondary) source
      const full = getFullSizeImageSrc(element);

      // Return an object with the original and secondary (full size) source
      return { src, full };
    });
};

export default getRangeImages;
