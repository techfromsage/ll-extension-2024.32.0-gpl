export interface ResponseEbscoResultItem {
  Name: string,
  Data: string,
}

export interface ResponseEbscoResult {
  Items: ResponseEbscoResultItem[],
  Header: {
    DbId: string,
    An: string,
  },
}

/**
 * Interface ProviderResponseEbsco represents the payload that comes back from
 * the Ebsco Rest API.
 */
interface ProviderResponseEbsco {
  SearchResult: {
    Data: {
      Records?: ResponseEbscoResult[],
    },
  },
}

export default ProviderResponseEbsco;
