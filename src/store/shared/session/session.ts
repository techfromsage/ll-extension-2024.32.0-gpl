import { SessionStoreSlice } from '@/store';

export interface SessionSlice {
  session: any,
}

export const createSessionSlice: SessionStoreSlice<SessionSlice> = set => ({
  session: {},
});
