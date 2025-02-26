import DoiSearchResponse from '@/interfaces/alternatives/DoiSearchResponse';
import { HTTPRequest } from '@/interfaces/browser/AppMethods';
import ParseDoiSearchResponse from './ParseDoiSearchResponse';

/**
 * Converts a DOI into a format that can be used as an Elasticsearch ID.
 * Elasticsearch can't take `/` in the doi string, so we need to convert them to `_`.
 */
export const parseDoi = (doi: string) => doi.replace(/[\\/]/g, '_').toLowerCase();

/**
 * Service to obtain Article metadata from DOI.
 */
export default (urlTemplate: string, httpRequest: HTTPRequest) => (doi: string) => {
  const url = `${urlTemplate}/article_metadata/_doc`;
  return httpRequest<DoiSearchResponse>({
    method: 'get',
    url: `${url}/${parseDoi(doi)}`,
    headers: { 'cache-control': 'default' },
  })
    .then(ParseDoiSearchResponse)
    .catch(() => undefined);
};
