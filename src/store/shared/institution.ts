import merge from 'lodash.merge';
import { StoreSlice } from '@/store';
import Institution, { InstitutionInsyde, InstitutionSettings } from '@/interfaces/Institution';
import { InstitutionList, InstitutionListItem } from '@/interfaces/InstitutionListItem';
import InstitutionItems from '@/interfaces/InstitutionItems';
import InstitutionObject from '@/interfaces/InstitutionObject';
import AdapterSearchEnhancersToArray from '@/store/shared/adapters/AdapterSearchEnhancersToArray';
import AdapterAccessConfig from '@/store/shared/adapters/AdapterAccessConfig';
import Translation from '@/interfaces/Translation';
import FetchClient from '@/interfaces/http/FetchClient';
import State from '@/enums/State';

export interface DeniedDomains {
  domain: string,
  states: State[], // States to deny for the given domain
}

export interface InstitutionSlice {
  institutes: Institution[],
  fetchInstitution: (
    instituteIds: string[],
    insydeUrl: string,
    settingsUrl: string,
    httpClient: FetchClient
  ) => Promise<Institution[]>,
  translations: InstitutionObject<Translation>,
  fetchInstitutionTranslations: (instituteIds: string[], url: string, httpClient: FetchClient) => Promise<Translation[]>,
  institutionsList: InstitutionListItem[],
  fetchInstitutionsList: (url: string, httpClient: FetchClient) => Promise<InstitutionListItem[]>,
  institutionsDeniedDomains: InstitutionItems<DeniedDomains>,
  fetchInstitutionsDeniedDomains: (instituteIds: string[], url: string, httpClient: FetchClient) => Promise<void>,
}

export const createInstitutionSlice: StoreSlice<InstitutionSlice> = set => ({
  institutes: [],
  fetchInstitution: async (instituteIds, insydeUrl, settingsUrl, httpClient) => {
    if (!instituteIds?.length) {
      set({ institutes: [] });
      return [];
    }
    const promises: Promise<Institution>[] = instituteIds.map(async instituteId => {
      const insyde = await httpClient.get<InstitutionInsyde>(`${insydeUrl}${instituteId}`);
      const { settings } = await httpClient.get<{ settings: InstitutionSettings }>(
        `${settingsUrl}`.replace(/{instituteId}/g, instituteId),
      );
      return merge(
        insyde,
        settings,
        { searchEnhancers: AdapterSearchEnhancersToArray(insyde.searchEnhancers) },
        { access: AdapterAccessConfig(insyde.access, insyde.id) },
      );
    });
    const institutes = await Promise.all(promises);
    set({ institutes });
    return institutes;
  },
  translations: {},
  fetchInstitutionTranslations: async (instituteIds, url, httpClient) => {
    const items = await Promise.all(instituteIds.map(
      id => httpClient
        .get<{ translations: Translation }>(`${url}`.replace(/{instituteId}/g, id))
        .then(({ translations }) => [id, translations]),
    ));
    const translations = Object.fromEntries(items);
    set({ translations });
    return translations;
  },
  institutionsList: [],
  fetchInstitutionsList: async (url, httpClient) => {
    const { institutions } = await httpClient.get<InstitutionList>(url);
    institutions.sort(
      (institution1, institution2) => (
        (institution1.name.toLowerCase() > institution2.name.toLowerCase()) ? 1 : -1
      ),
    );
    set({ institutionsList: institutions });
    return institutions;
  },
  institutionsDeniedDomains: {},
  fetchInstitutionsDeniedDomains: async (instituteIds, url, httpClient) => {
    const items = await Promise.all(instituteIds.map(
      id => httpClient
        .get<DeniedDomains[]>(`${url}${id}`)
        .then(domains => [id, domains]),
    ));
    const institutionsDeniedDomains = Object.fromEntries(items);
    set({ institutionsDeniedDomains });
    return institutionsDeniedDomains;
  },
});
