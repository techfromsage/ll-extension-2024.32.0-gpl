/**
 * Looks to see if Article URLs exist in an Institution's Holdings Systems
 */
import State from '@/enums/State';
import FullTextArticleResponse from '@/interfaces/alternatives/FullTextArticleResponse';
import DigitalResourcesURLs from '@/interfaces/alternatives/DigitalResourcesURLs';
import ReplacedKeys from '@/modules/alternatives/ReplacedKeys';
import CrossrefParamsAdapter from '@/interfaces/alternatives/CrossrefParamsAdapter';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import Institution from '@/interfaces/Institution';
import { HTTPRequest } from '@/interfaces/browser/AppMethods';
import UrlBuild from '@/modules/shared/UrlBuild';
import FollowedUrls from './FollowedUrls';

/**
 * Transforms the response from the FullText API into a DigitalResource object
 * by following the URLs from the browser extension.
 *
 * @param urlTemplate
 * @param article
 * @param institution
 * @param httpRequest
 * @param replacementParams
 */
const urls = (
  urlTemplate: string,
  article: DigitalResource,
  institution: Institution,
  httpRequest: HTTPRequest,
  replacementParams?: CrossrefParamsAdapter,
) => async (): Promise<DigitalResource[]> => {
  try {
    const resources = JSON.stringify({ fullText: ReplacedKeys(article.metadata, replacementParams) });
    const url = UrlBuild(urlTemplate, { instituteId: institution.id, resources }).generate();
    const { fullText } = await httpRequest<FullTextArticleResponse>({
      method: 'get',
      url,
      headers: { 'cache-control': 'default' },
    });
    const baseUrls = fullText?.urls.filter(Boolean) || [];
    const [firstUrl] = baseUrls;
    const followed = await FollowedUrls(firstUrl, institution.access, httpRequest);
    return [{
      ...article,
      title: fullText?.title || '',
      urls: Array.from(new Set([...baseUrls, ...followed])),
      institution,
      state: State.FullTextFinder,
    }];
  } catch {
    return [];
  }
};

/**
 * Looks to see if Article URLs exist in an Institution's Holdings Systems
 */
const FullTextFinderArticle = (
  urlTemplate: string,
  article: DigitalResource,
  institution: Institution,
  httpRequest: HTTPRequest,
  replacementParams?: CrossrefParamsAdapter,
): DigitalResourcesURLs => {
  return {
    urls: urls(urlTemplate, article, institution, httpRequest, replacementParams),
    state: State.FullTextFinder,
  };
};

export default FullTextFinderArticle;
