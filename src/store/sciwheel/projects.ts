import { StoreSlice } from '@/store';
import FetchClient from '@/interfaces/http/FetchClient';
import { SciwheelProject } from '@/interfaces/sciwheel/SciwheelProject';
import { SciwheelUser } from '@/interfaces/sciwheel/SciwheelUser';
import SciwheelType from '@/enums/sciwheel/SciwheelType';
import { HTTPRequest } from '@/interfaces/browser/AppMethods';

export interface ProjectSlice {
  projects: SciwheelProject[],
  fetchProjects: (url: string, httpClient: FetchClient, user: SciwheelUser) => Promise<SciwheelProject[] | undefined>,
  addNewProject: (
    url: string,
    httpRequest: HTTPRequest,
    user: SciwheelUser,
    newProjectName: string,
  ) => Promise<SciwheelProject | undefined>,
  canCreateProject: (url: string, httpRequest: FetchClient, user: SciwheelUser) => Promise<boolean>,
}

/**
 * Sorts projects by type, private projects come first
 */
const typeOrder = {
  [SciwheelType.ReadingList]: 1,
  [SciwheelType.Private]: 2,
  [SciwheelType.Shared]: 3,
};
const sortProjectsByType = (a: SciwheelProject, b: SciwheelProject) => {
  return (typeOrder[a.type as SciwheelType]) - (typeOrder[b.type as SciwheelType]);
};

export const createProjectSlice: StoreSlice<ProjectSlice> = set => ({
  projects: [],
  fetchProjects: async (url, httpClient, user) => {
    if (!user) {
      return [];
    }
    const headers = { Authorization: `${user.apiToken.type} ${user.apiToken.value}` };
    const fetchedProjects = await httpClient.get<SciwheelProject[]>(url, { headers });
    fetchedProjects.sort(sortProjectsByType);

    // these items don't exist in the API, but are default options
    const unsortedProject: SciwheelProject = {
      id: '',
      name: 'Unsorted',
    };
    const readingListProject: SciwheelProject = {
      id: SciwheelType.ReadingList,
      name: 'Reading List',
    };

    const projects = [
      unsortedProject,
      readingListProject,
      ...fetchedProjects,
    ];

    set({ projects });

    return projects;
  },
  addNewProject: async (
    urlTemplate: string,
    httpRequest: HTTPRequest,
    user: SciwheelUser,
    newProjectName: string,
  ): Promise<SciwheelProject | undefined> => {
    if (!newProjectName || !user.id) {
      return undefined;
    }
    const url = urlTemplate.replace(/{projectName}/g, newProjectName);
    const headers = { Authorization: `${user.apiToken.type} ${user.apiToken.value}` };
    const newProject = await httpRequest<SciwheelProject>({
      method: 'get',
      url,
      headers,
    })
      .then(res => Promise.resolve(res))
      .catch(() => Promise.resolve(undefined));

    if (newProject) {
      set(state => {
        const projects = [...state.projects, newProject].sort(sortProjectsByType);
        return { projects };
      });
    }
    return newProject;
  },
  canCreateProject: async (url: string, httpRequest: FetchClient, user: SciwheelUser) => {
    const headers = { Authorization: `${user.apiToken.type} ${user.apiToken.value}` };
    return httpRequest.get<boolean>(url, { headers });
  },
});
