import FetchClient from '@/interfaces/http/FetchClient';
import { SciwheelUser } from '@/interfaces/sciwheel/SciwheelUser';
import { StoreSlice } from '@/store';

export interface UserSlice {
  user: SciwheelUser | undefined,
  fetchUser: (url: string, httpClient: FetchClient) => Promise<SciwheelUser>,
  signOutUser: (logOutUrl: string, signOutUrl: string, httpClient: FetchClient, user: SciwheelUser) => Promise<SciwheelUser>,
}

export const createUserSlice: StoreSlice<UserSlice> = set => ({
  user: undefined,
  fetchUser: async (url, httpClient) => {
    const user = await httpClient.get<SciwheelUser>(url);
    set({ user });
    return user;
  },
  signOutUser: async (logOutUrl, signOutUrl, httpClient, user) => {
    const headers = { Authorization: `${user.apiToken.type} ${user.apiToken.value}` };
    await httpClient.get(logOutUrl, { headers });
    await httpClient.get(signOutUrl, { headers });

    set({ user: undefined });
    return user;
  },
});
