import { v4 as uuidv4 } from 'uuid';
import merge from 'lodash.merge';
import { StoreSlice } from '@/store';
import { Config } from '@/interfaces/Config';
import OnCampus from '@/interfaces/OnCampus';
import AdapterDoiScraper from '@/store/shared/adapters/AdapterDoiScraper';
import bootstrap from '@bootstrap/index';
import FetchClient from '@/interfaces/http/FetchClient';

interface GlobalDenylistApi {
  domains: string[],
}

export interface SettingsSlice {
  _hasHydrated: boolean,
  clientId: string,
  setClientId: (clientId: string) => void,
  generateClientId: () => string,
  config: Config | undefined,
  getConfig: (url: string, version: string, httpClient: FetchClient) => Promise<Config>,
  globalDenylist: string[],
  fetchGlobalDenylist: (url: string, httpClient: FetchClient) => Promise<string[]>,
  onCampus: OnCampus,
  setOnCampus: (payload: OnCampus) => OnCampus,
}

export const createSettingsSlice: StoreSlice<SettingsSlice> = set => ({
  _hasHydrated: false,
  clientId: '',
  setClientId: clientId => set({ clientId }),
  generateClientId: () => {
    const clientId = uuidv4();
    set({ clientId });
    return clientId;
  },
  config: undefined,
  getConfig: async (url, version, httpClient) => {
    const { config: apiConfig } = await httpClient.get<{ config: Config }>(url);
    const config = merge(
      bootstrap,
      apiConfig,
      {
        version,
        doiScraper: apiConfig.doiScraper.map(AdapterDoiScraper),
      },
    );
    set({ config });
    return config;
  },
  globalDenylist: [],
  fetchGlobalDenylist: async (url, httpClient) => {
    const { domains } = await httpClient.get<GlobalDenylistApi>(url);
    const globalDenylist = domains.filter(Boolean);
    set({ globalDenylist });
    return globalDenylist;
  },
  onCampus: {},
  setOnCampus: payload => {
    set(state => ({
      onCampus: {
        ...state.onCampus,
        ...payload,
      },
    }));
    return payload;
  },
});
