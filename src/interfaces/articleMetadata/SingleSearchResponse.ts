/**
 * Interface SingleSearchResponse represents the JSON response we get back from doing a "single-search".
 *
 * A "single-search" is a search to the ArticleMetadata API which queries a single resource at a time.
 */
import QuerySearchResponse from '@/interfaces/articleMetadata/QuerySearchResponse';

interface SingleSearchResponse {
  hits: {
    hits: QuerySearchResponse[],
  },
}

export default SingleSearchResponse;
