import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import DigitalResourceType from '@/enums/DigitalResourceType';
import { ISBNMetadataItem } from '@/interfaces/alternatives/ISBNMetadataResponse';
import BookISBNQuery from '@/modules/shared/articlesMetadata/BookISBNQuery';
import { asIsbn10, asIsbn13 } from 'isbn3';

const allIsbns = (originalIsbn: string, relatedIsbns: string[]) => {
  return [originalIsbn, ...relatedIsbns]
    .map(isbn => {
      const isbn13 = asIsbn13(isbn)?.replace(/-/g, '');
      return isbn13 || isbn;
    })
    .concat(asIsbn10(originalIsbn))
    .filter(Boolean);
};

/**
 * Obtains metadata for a EBook from ISBN.
 * Primarily design to be used in a map function.
 */
export default (
  relatedIsbnsService: (isbn: string) => Promise<ISBNMetadataItem | undefined>,
  searchMetadataService: <Query extends Record<string, any>>(query: Query) => Promise<any>,
) => async (resource: DigitalResource): Promise<DigitalResource> => {
  if (resource.type !== DigitalResourceType.EBook) {
    return resource;
  }
  const isbnMetadata = await relatedIsbnsService(resource.identifier);
  const relatedIsbns = allIsbns(resource.identifier, isbnMetadata?.relatedIsbns || []);

  return {
    ...resource,
    isbnMetadata: {
      id: isbnMetadata?.id || resource.identifier,
      ...isbnMetadata,
      relatedIsbns,
    },
    metadata: resource.metadata ? resource.metadata : await searchMetadataService(BookISBNQuery(relatedIsbns)),
  };
};
