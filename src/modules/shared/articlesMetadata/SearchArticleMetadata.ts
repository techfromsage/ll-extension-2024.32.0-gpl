/**
 * Search for article metadata in the article metadata database.
 */
import { HTTPRequest } from '@/interfaces/browser/AppMethods';
import ParseDoiSearchResponse from '@/modules/alternatives/doi/ParseDoiSearchResponse';
import SingleSearchResponse from '@/interfaces/articleMetadata/SingleSearchResponse';
import ArticleMetadata from '@/interfaces/alternatives/ArticleMetadata';

export default async <Query extends Record<string, any>>(
  urlTemplate: string,
  httpRequest: HTTPRequest,
  query: Query,
): Promise<ArticleMetadata | undefined> => {
  const url = `${urlTemplate}/article_metadata/_search`;
  const body = JSON.stringify(query);
  return httpRequest<SingleSearchResponse>({ method: 'post', url, body })
    .then(res => res.hits.hits[0])
    .then(ParseDoiSearchResponse)
    .catch(() => undefined);
};
