import ProviderResponseJove from '@/interfaces/librarySearches/jove/ProviderResponseJove';
import { XMLParser } from 'fast-xml-parser';
import StripHtmlTags from '@/modules/shared/StripHtmlTags';
import { decode } from 'html-entities';

/**
 * ValidateResponse
 */
export default (textResponse: string): ProviderResponseJove => {
  const parser = new XMLParser({
    /**
     * <article> tag considered as an array entry.
     */
    isArray: name => name === 'article',
    /**
     * Jove API contains encoded HTML tags within the XML.
     */
    tagValueProcessor: (_, tagValue) => StripHtmlTags(decode(tagValue)),
  });
  return parser.parse(textResponse);
};
