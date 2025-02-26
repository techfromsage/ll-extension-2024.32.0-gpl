/**
 * Interface QuerySearchResponse is the response expected from an elasticsearch query
 *
 * @see https://search.leanlibrary.com/article_metadata/_search
 */
import DoiSearchResponse from '@/interfaces/alternatives/DoiSearchResponse';

interface QuerySearchResponse extends DoiSearchResponse {
  _score: number,
}

export default QuerySearchResponse;
