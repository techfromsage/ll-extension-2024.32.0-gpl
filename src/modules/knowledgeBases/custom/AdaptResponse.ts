import { XMLParser } from 'fast-xml-parser';
import ProviderResponseCustom from '@/interfaces/librarySearches/custom/ProviderResponseCustom';

/**
 * Adapt Response, adapts XML to JSON
 */
export default (textResponse: string): ProviderResponseCustom => {
  const parser = new XMLParser({
    /**
     * <result_set> tag considered as an array entry.
     */
    isArray: name => name === 'result_set',
  });
  return parser.parse(textResponse);
};
