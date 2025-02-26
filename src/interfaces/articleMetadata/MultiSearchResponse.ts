/**
 * Interface MultiSearchResponse represents the JSON response we get back from doing a "multi-search".
 *
 * A "multi-search" is a search to the ArticleMetadata API which queries multiple articles at once.
 * This helps with performance as it reduces the number of HTTP requests we need to do.
 */
import QuerySearchResponse from '@/interfaces/articleMetadata/QuerySearchResponse';

interface MultiSearchResponse {
  responses: {
    hits: {
      hits: QuerySearchResponse[],
    },
  }[],
}

export default MultiSearchResponse;
