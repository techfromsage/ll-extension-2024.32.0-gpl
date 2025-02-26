import { StoreSlice } from '@/store';

export interface ReferenceManagerSettingsSlice {
  referenceDenyList: string[],
}

export const createReferenceManagerSettingsSlice: StoreSlice<ReferenceManagerSettingsSlice> = set => ({
  referenceDenyList: [
    'onedrive.live.com',
    'mail.google.com',
    'inbox.google.com',
    'mail.live.com',
    'bing.com',
    'dropbox.com',
    'search.yahoo.com',
    'duckduckgo.com',
    'linkedin.com',
    'instagram.com',
    'myspace.com',
    'hi5.com',
    'plus.google.com',
    'messenger.com',
    'web.whatsapp.com',
    'web.skype.com',
    'facebook.com',
    'twitter.com',
  ],
});
