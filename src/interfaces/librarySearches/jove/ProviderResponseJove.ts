export interface ResponseJoveResult {
  link: string,
  title: string,
  abstract: string,
}

/**
 * Interface ProviderResponseJove represents the payload that comes back from
 * the Jove Rest API.
 */
interface ProviderResponseJove {
  articles: {
    article?: ResponseJoveResult[],
  },
}

export default ProviderResponseJove;
