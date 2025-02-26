/**
 * Looks up article URLs from Core.ac.uk API
 */
import CoreResponse from '@/interfaces/alternatives/CoreResponse';
import State from '@/enums/State';
import DigitalResourcesURLs from '@/interfaces/alternatives/DigitalResourcesURLs';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import Institution from '@/interfaces/Institution';
import { HTTPRequest } from '@/interfaces/browser/AppMethods';
import { OpenAccessSource } from '@/interfaces/ui/OpenAccessUI';

/**
 * @param {string} urlTemplate The URL with DOI and API key placeholders
 * @param {string} apiKey
 * @param article
 * @param institution
 * @param httpRequest
 * @returns {DigitalResourcesURLs}
 * @constructor
 */
const OpenAccessDBCore = (
  urlTemplate: string,
  apiKey: string,
  article: DigitalResource,
  institution: Institution,
  httpRequest: HTTPRequest,
): DigitalResourcesURLs => {
  return {
    urls: () => httpRequest<CoreResponse>(
      {
        method: 'post',
        url: urlTemplate,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ doi: article.identifier }),
      },
    )
      .then(response => {
        return [{
          ...article,
          state: State.OpenAccess,
          urls: [response.fullTextLink].filter(Boolean),
          title: '',
          institution,
          openAccess: OpenAccessSource.Core,
        }];
      })
      .catch(() => []),
    state: State.OpenAccess,
  };
};

export default OpenAccessDBCore;
