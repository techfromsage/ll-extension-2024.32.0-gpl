import { HTTPRequest } from '@/interfaces/browser/AppMethods';
import { SciwheelUser } from '@/interfaces/sciwheel/SciwheelUser';
import { SciwheelProject } from '@/interfaces/sciwheel/SciwheelProject';
import { SciwheelLibraryItem } from '@/interfaces/sciwheel/SciwheelLibraryItem';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import NonAcademicResource from '@/interfaces/sciwheel/NonAcademicResource';
import ConvertMetadataToLibraryItem from './AdaptorMetadataToLibraryItem';

interface ImportIdsResponse {
  [key: string]: number,
}

/**
 * Posts digitalResources / libraryItems to a user's Sciwheel library
 */
export default async (
  urlTemplate: string,
  httpRequest: HTTPRequest,
  user: SciwheelUser,
  project: SciwheelProject,
  citeResources: (DigitalResource & NonAcademicResource)[],
  currentLocation: string,
): Promise<ImportIdsResponse | undefined> => {
  if (!citeResources.length || !project) {
    return undefined;
  }

  const libraryItems: SciwheelLibraryItem[] = citeResources
    .map(resource => ConvertMetadataToLibraryItem(resource, currentLocation))
    .filter(Boolean);

  const url = urlTemplate
    .replace(/{project}/g, project.id);
  const headers = { Authorization: `${user.apiToken.type} ${user.apiToken.value}` };
  const body = JSON.stringify({ identifiers: libraryItems });

  return httpRequest<ImportIdsResponse>({
    method: 'post',
    url,
    headers,
    body,
  })
    .then(res => Promise.resolve(res))
    .catch(() => Promise.resolve(undefined));
};
