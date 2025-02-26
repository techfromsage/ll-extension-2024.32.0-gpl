/**
 * Extracts results from an JSTOR response.
 *
 * [
 * {
 *     "recordSchema": "info:srw/schema/1/dc-v1.1",
 *     "recordPacking": "xml",
 *     "recordData": {
 *         "srw_dc:dc": {
 *             "dc:creator": "Madeleine Fairbairn",
 *             "dc:publisher": "Cornell University Press",
 *             "dc:title": "Fields of Gold: Financing the Global Land Rush",
 *             "dc:identifier": "URL: http://www.someurl.com",
 *             "dc:description": "Some desc",
 *             "dc:date": "2020-01-01",
 *             "dc:type": "BOOK",
 *             "dc:language": "eng"
 *         }
 *     },
 *     "recordPosition": 1
 * },
 *
 * ]
 *
 * becomes:
 *
 * {
 *   "publisher": "Cornell University Press",
 *   "title": "Fields of Gold: Financing the Global Land Rush",
 *   "identifier": "http://www.someurl.com",
 *   "description": "Some desc",
 *
 * }
 */

import ProviderResponseJSTOR from '@/interfaces/librarySearches/jstor/ProviderResponseJSTOR';

const resultUrl = (id: string | string[]): string => {
  const text = Array.isArray(id) ? [...id].pop() : id;
  return text ? text.split('URL: ')[1] : '';
};

export default (response: ProviderResponseJSTOR): Record<string, any>[] => {
  const { records } = response.searchRetrieveResponse;

  return records
    ? records.record.map(record => {
      const data = record.recordData['srw_dc:dc'];
      const url = resultUrl(data['dc:identifier'] || '');
      return {
        publisher: data['dc:publisher'],
        title: data['dc:title'],
        url,
        description: data['dc:description'],
      };
    })
    : [];
};
