/**
 * Interface CoreResponse represents the JSON response we get from the Core API when looking up
 * Open Access URLs.
 */
interface CoreResponse {
  fullTextLink: string,
  source: string,
}

export default CoreResponse;
