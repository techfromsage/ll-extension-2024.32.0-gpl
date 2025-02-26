import LibraryResourceType from '@/enums/futures/LibraryResourceType';
import LibchatItem from '@/interfaces/libraryResources/LibchatItem';
import { HTTPRequest } from '@/interfaces/browser/AppMethods';

interface LibchatItemResource {
  resource: LibchatItem,
}

/**
 * Fetches a libchat item from the API.
 */
export default async (
  urlTemplate: string,
  uuid: string,
  httpRequest: HTTPRequest,
  libraryResourceType?: LibraryResourceType,
): Promise<LibchatItem | undefined> => {
  if (!libraryResourceType) {
    return undefined;
  }
  const url = urlTemplate
    .replace(/{type}/g, libraryResourceType)
    .replace(/{uuid}/g, uuid);

  return httpRequest<LibchatItemResource>({ method: 'get', url })
    .then(({ resource }) => Promise.resolve(resource))
    .catch(() => Promise.resolve(undefined));
};
