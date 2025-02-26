export interface ResponseTDNETResult {
  title: string,
  metadata: {
    id: string,
  },
  publisher?: string,
  description?: string,

}

/**
 * Interface ProviderResponseTDNET represents the payload that comes back from
 * the TDNET Rest API.
 */
interface ProviderResponseTDNET {
  publications: ResponseTDNETResult[],
}

export default ProviderResponseTDNET;
