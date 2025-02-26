import ISBN from 'isbn3';
import State from '@/enums/State';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import DigitalResourcesURLs from '@/interfaces/alternatives/DigitalResourcesURLs';
import Institution from '@/interfaces/Institution';
import UrlBuild from '@/modules/shared/UrlBuild';
import ReplacedKeys from '@/modules/alternatives/ReplacedKeys';
import { CombinedMetadata } from '@/modules/referenceManager/CombinedMetadata';

/**
 * Builds an order form url
 * If the institution has it enabled, with custom search params to generate a pre-filled form
 */
const BookOrderForm = (
  isbnOrderForm: Pick<Institution['alternatives']['order_form'], 'isbn'>['isbn'],
  resource: DigitalResource,
  institution: Institution,
): DigitalResourcesURLs => {
  const generate = (): string => {
    // this should never happen, the backend / admin dashboard should be handling this edge case
    if (!isbnOrderForm.url) {
      throw new Error('Institution has enabled orderForm but hasn\'t provided an orderForm URL');
    }

    if (!isbnOrderForm.params) {
      return isbnOrderForm.url;
    }

    // Add & convert isbn metadata to the data object
    const metadata = {
      ...CombinedMetadata(resource),
      ...resource.metadata,
      articleTitle: resource.isbnMetadata?.title,
      author: resource.isbnMetadata?.authors,
    };

    const replaceIsbn = ISBN.parse(resource.identifier);
    // Replace isbn ahead of isbn key replacement
    if (replaceIsbn?.isValid) {
      metadata.isbn = resource.identifier;
    }

    const params = ReplacedKeys(metadata, isbnOrderForm.params);

    // Replace isbn in the default case of no isbn key replacement
    if (replaceIsbn && !Object.prototype.hasOwnProperty.call(isbnOrderForm.params, 'isbn')) {
      params.isbn = resource.identifier;
    }

    return UrlBuild(isbnOrderForm.url, params).generate();
  };

  return {
    urls: () => Promise.resolve([{
      ...resource,
      urls: [generate()],
      institution,
      state: State.OrderForm,
    }]),
    state: State.OrderForm,
  };
};

export default BookOrderForm;
