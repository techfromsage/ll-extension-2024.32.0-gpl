/**
 * ValidISSNs checks if one or Journals (ISSNs) are in our backend system for a given set of articles.
 */
import { HTTPRequest } from '@/interfaces/browser/AppMethods';
import ArticleMetadata from '@/interfaces/alternatives/ArticleMetadata';

interface Response {
  issn: string[],
}

export default async (
  urlTemplate: string,
  articlesMetadata: ArticleMetadata[],
  institution: string,
  httpRequest: HTTPRequest,
): Promise<string[]> => {
  const allIssns = articlesMetadata
    .map(({ issn }) => issn)
    .filter(Boolean)
    .flat();

  const url = urlTemplate
    .replace(/{instituteId}/g, institution)
    .replace(/{issn}/g, allIssns.join(','));
  try {
    const response = await httpRequest<Response>({ method: 'get', url, headers: { 'cache-control': 'default' } });
    return response.issn;
  } catch {
    return [];
  }
};
