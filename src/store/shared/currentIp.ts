/**
 * Stores the user's current IP
 */
import { StoreSlice } from '@/store';
import FetchClient from '@/interfaces/http/FetchClient';

export interface CurrentIpSlice {
  currentIp: string,
  fetchCurrentIp: (url: string, httpClient: FetchClient) => Promise<string>,
}

export const createCurrentIpSlice: StoreSlice<CurrentIpSlice> = set => ({
  currentIp: '',
  fetchCurrentIp: (url, httpClient) => {
    return new Promise(resolve => {
      httpClient
        .get<{ ip: string }>(url)
        .then(({ ip }) => {
          set({ currentIp: ip });
          resolve(ip);
        })
        .catch(_ => resolve(''));
    });
  },
});
