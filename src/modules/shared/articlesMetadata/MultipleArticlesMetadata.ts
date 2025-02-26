/**
 * Searches for multiple articles within the article metadata search engine.
 */
import MultiSearchResponse from '@/interfaces/articleMetadata/MultiSearchResponse';
import MultiSearchBodyAdapter from '@/modules/shared/articlesMetadata/MultiSearchBodyAdapter';
import ArticleQuery from '@/modules/shared/articlesMetadata/ArticleQuery';
import ArticleSearch from '@/interfaces/articleMetadata/ArticleSearch';
import { HTTPRequest } from '@/interfaces/browser/AppMethods';
import parseDoiSearchResponse from '@/modules/alternatives/doi/ParseDoiSearchResponse';
import SearchResultItem from '@/interfaces/SearchResultItem';

const SCORE_THRESHOLD = 60;

const parseSearchResponse = (response: MultiSearchResponse | undefined) => {
  if (!response || !response.responses) {
    return [];
  }

  return response.responses
    .flatMap(({ hits }) => hits.hits)
    .map((item, index) => (item._score > SCORE_THRESHOLD ? {
      metadata: parseDoiSearchResponse(item),
      position: index,
    } : null))
    .filter(Boolean);
};

export default async (
  urlTemplate: string,
  httpRequest: HTTPRequest,
  articleDetails: ArticleSearch[],
): Promise<SearchResultItem[]> => {
  const url = `${urlTemplate}/article_metadata/_msearch`;
  const body = MultiSearchBodyAdapter(articleDetails.map(ArticleQuery));
  const response = await httpRequest<MultiSearchResponse>({
    method: 'post',
    url,
    body,
    headers: { 'cache-control': 'default' },
  });
  return parseSearchResponse(response);
};
