/**
 * Interface ProviderResponseWorldcat represents the payload that comes back from
 * the Worldcat API.
 */
interface ProviderResponseWorldcat {
  briefRecords?: {
    oclcNumber: string,
    title: string,
    creator: string,
    summariesText?: string[],
    publisher?: string,
  }[],
}

export default ProviderResponseWorldcat;
