import LibraryResourceType from '@/enums/futures/LibraryResourceType';
import ModalItem from '@/interfaces/libraryResources/ModalItem';
import { HTTPRequest } from '@/interfaces/browser/AppMethods';

interface ModalItemResource {
  resource: ModalItem,
}

/**
 * Fetches a modal item from the API.
 */
export default async (
  urlTemplate: string,
  uuid: string,
  httpRequest: HTTPRequest,
  libraryResourceType?: LibraryResourceType,
): Promise<ModalItem | undefined> => {
  if (!libraryResourceType) {
    return undefined;
  }

  const url = urlTemplate
    .replace(/{type}/g, libraryResourceType)
    .replace(/{uuid}/g, uuid);

  return httpRequest<ModalItemResource>({ method: 'get', url })
    .then(({ resource }) => Promise.resolve(resource))
    .catch(() => Promise.resolve(undefined));
};
