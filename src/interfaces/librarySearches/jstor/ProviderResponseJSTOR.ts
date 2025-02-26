export interface ResponseJSTORResult {
  recordData: {
    'srw_dc:dc': {
      'dc:title': string,
      'dc:publisher': string,
      'dc:identifier'?: string | string[],
      'dc:description'?: string,
    },
  },
}

/**
 * Interface ProviderResponseJSTOR represents the payload that comes back from
 * the JSTOR Rest API.
 */
interface ProviderResponseJSTOR {
  searchRetrieveResponse: {
    records?: {
      record: ResponseJSTORResult[],
    },
  },
}

export default ProviderResponseJSTOR;
