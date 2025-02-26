export interface ResponseTripResult {
  id: string,
  publication: string,
  link: string,
  title: string,
}

/**
 * Interface ProviderResponseTrip represents the payload that comes back from
 * the Trip Rest API.
 */
interface ProviderResponseTrip {
  documents: {
    document: ResponseTripResult[],
  },
}

export default ProviderResponseTrip;
