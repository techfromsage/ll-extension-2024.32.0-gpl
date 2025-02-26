import DoiSearchResponse from '@/interfaces/alternatives/DoiSearchResponse';
import ArticleMetadata from '@/interfaces/alternatives/ArticleMetadata';
import CleanObject from '@/modules/shared/CleanObject';
import { ArticleOpenAccess } from '@/interfaces/articleMetadata/ArticleItem';

const getFirst = (value: string[] | undefined | null): string | undefined => {
  return value?.shift();
};

/**
 * Sort isBest locations to the top, then extracts the location urls
 */
const extractUrls = (openAccessInfo?: ArticleOpenAccess) => {
  return Object.values(openAccessInfo || {})
    .flatMap(({ locations }) => locations)
    .sort((a, b) => Number(b.isBest) - Number(a.isBest))
    .map(({ url }) => url);
};

/**
 * Extracts and parses data from the response, removes each item that is undefined
 */
const ParseDoiSearchResponse = (response: DoiSearchResponse): ArticleMetadata => {
  const source = response._source;
  const [openAccessUrl] = extractUrls(source.openAccess);
  const payload: ArticleMetadata = {
    articleTitle: getFirst(source.title),
    journalTitle: getFirst(source['container-title']),
    author: source.authors ? source.authors.join(', ') : undefined,
    authorsSplit: source.authorsSplit || undefined,
    publisher: source.publisher,
    publisherLocation: source['publisher-location'],
    startPage: source.page ? source.page.split('-').shift() : undefined,
    pages: source.page,
    volume: source.volume ? parseInt(source.volume, 10) : undefined,
    issue: source.issue,
    doi: source.doi,
    issn: getFirst(source.ISSN),
    isbn: getFirst(source.ISBN),
    issued: source.issued,
    type: source.type,
    openAccess: source.openAccess,
    openAccessUrls: openAccessUrl ? [openAccessUrl] : undefined,
  };

  return CleanObject(payload) as ArticleMetadata;
};

export default ParseDoiSearchResponse;
