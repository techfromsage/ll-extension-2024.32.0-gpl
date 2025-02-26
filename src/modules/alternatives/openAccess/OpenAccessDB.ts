/**
 * Looks up resource URLs from Digital Resources
 */
import State from '@/enums/State';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import DigitalResourcesURLs from '@/interfaces/alternatives/DigitalResourcesURLs';
import Institution from '@/interfaces/Institution';
import { OpenAccessSource } from '@/interfaces/ui/OpenAccessUI';
import FollowedUrls from '@/modules/alternatives/fullText/FollowedUrls';
import { HTTPRequest } from '@/interfaces/browser/AppMethods';

/**
 * @param {DigitalResource} resource
 * @param institution
 * @param resources
 * @returns {DigitalResourcesURLs}
 * @constructor
 */
const OpenAccessDB = (
  resource: DigitalResource,
  institution: Institution,
  httpRequest: HTTPRequest,
): DigitalResourcesURLs => {
  return {
    urls: () => {
      const urls = resource.metadata?.openAccessUrls || [];
      const [firstUrl] = urls;
      return FollowedUrls(firstUrl, institution.access, httpRequest).then(followed => {
        // If the resource has DOAB, it is an Open Access Ebook
        const isDoab = resource.metadata?.openAccess?.doab;
        if (isDoab) {
          return [{
            ...resource,
            state: State.OpenAccessEbook,
            urls: Array.from(new Set([...urls, ...followed])),
            title: resource.metadata?.articleTitle,
            institution,
            openAccess: OpenAccessSource.Doab,
          }];
        }

        // If the resource does not have DOAB, it is an Unpaywall resource
        return [{
          ...resource,
          state: State.OpenAccess,
          urls: Array.from(new Set([...urls, ...followed])),
          title: resource.metadata?.articleTitle,
          institution,
          openAccess: OpenAccessSource.Unpaywall,
        }];
      });
    },
    state: State.OpenAccess,
  };
};

export default OpenAccessDB;
