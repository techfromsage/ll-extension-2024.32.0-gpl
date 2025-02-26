/**
 * Stores the default institution
 */
import { store, StoreSlice } from '@/store';
import bootstrap from '@bootstrap/index';
import FetchClient from '@/interfaces/http/FetchClient';

export interface DefaultInstitutionSlice {
  defaultInstitution: string,
  fetchDefaultInstitution: (httpClient: FetchClient) => Promise<string>,
}

export const createDefaultInstitutionSlice: StoreSlice<DefaultInstitutionSlice> = set => ({
  defaultInstitution: '',
  fetchDefaultInstitution: httpClient => {
    const { institutes, defaultInstitution, currentIp } = store.getState();
    if (institutes.length > 0) {
      return Promise.resolve(defaultInstitution);
    }
    const url = bootstrap.api.defaultInstitution.replace(/{ip}/g, currentIp);
    return httpClient.get<{ instituteId?: string }>(url)
      .then(response => {
        const instituteId = response.instituteId || '';
        set({ defaultInstitution: instituteId });
        return instituteId;
      })
      .catch(() => Promise.resolve(defaultInstitution));
  },
});
