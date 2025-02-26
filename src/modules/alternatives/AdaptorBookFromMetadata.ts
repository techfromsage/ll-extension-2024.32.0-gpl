import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import DigitalResourceType from '@/enums/DigitalResourceType';
import { asIsbn13 } from 'isbn3';

/**
 * Converts a DigitalResource into a book if the DOI metadata is actually a book.
 *
 * We assume DOIs are Articles but sometimes they are books and we can't know
 * until we look up the metadata. We then transform the DigitalResource to be a book.
 *
 * @param {Promise<DigitalResource>} promise
 * @returns {Promise<DigitalResource>}
 */
export default async (promise: Promise<DigitalResource>): Promise<DigitalResource> => {
  const resource = await promise;
  if (resource.metadata?.type?.startsWith('book') || resource.scrapedMetadata?.type?.startsWith('book')) {
    return {
      ...resource,
      identifier: asIsbn13(resource.metadata?.isbn || resource.scrapedMetadata?.isbn || ''),
      type: DigitalResourceType.EBook,
    };
  }
  if (resource.type === DigitalResourceType.EBook) {
    return {
      ...resource,
      identifier: asIsbn13(resource.identifier),
    };
  }
  return resource;
};
