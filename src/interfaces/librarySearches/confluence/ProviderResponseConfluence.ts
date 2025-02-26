/**
 * Interface ProviderResponseConfluence represents the payload that comes back from
 * the Confluence API.
 */
interface ProviderResponseConfluence {
  results: {
    content: {
      id: string,
    },
    friendlyLastModified: string,
    title: string,
    url: string,
    excerpt: string,
  }[],
}

export default ProviderResponseConfluence;
