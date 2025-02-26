export interface ResponseExLibrisResult {
  pnx: {
    display: {
      title: string[],
      publisher?: string[],
      description?: string[],
    },
    control: {
      recordid: string[],
    },
    addata: {
      notes?: string[],
    },
  },
}

/**
 * Interface ProviderResponseExLibris represents the payload that comes back from
 * the ExLibris API.
 */

interface ProviderResponseExLibris {
  docs: ResponseExLibrisResult[],
}

export default ProviderResponseExLibris;
