import DigitalResource from '@/interfaces/alternatives/DigitalResource';

/**
 * Takes array of digital resources and finds the primary resources.
 * Primary resources are either;
 *  - A unique scraperType
 * - All scraperTypes are the same, return all as this is either a referenceManager searchPage or ebookMultiple alternatives
 */
export default (acc: DigitalResource[], resource: DigitalResource) => {
  if (acc.length === 0) {
    return [resource];
  }

  if (acc[0].scraperType === resource.scraperType) {
    return [...acc, resource];
  }

  return acc;
};
