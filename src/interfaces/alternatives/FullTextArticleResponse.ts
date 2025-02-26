/**
 * Interface FullTextArticleResponse represents the JSON response from the API holdingInformation
 * endpoint when searching for Articles.
 */
interface FullTextArticleResponse {
  fullText: {
    urls: string[],
    title: string,
  },
}

export default FullTextArticleResponse;
