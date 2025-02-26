import { asIsbn13 } from 'isbn3';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';

/**
 * Finds the ebook in the list of digital resources.
 * For use in a find function.
 */
export default (resourceId: string) => (ebook: DigitalResource) => {
  const identifierToFind = asIsbn13(resourceId);
  const isbn = asIsbn13(ebook.identifier);
  return isbn && (isbn === identifierToFind || ebook.isbnMetadata?.relatedIsbns.includes(identifierToFind));
};
