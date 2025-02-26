import { StoreSlice } from '@/store';
import InstitutionItems from '@/interfaces/InstitutionItems';
import CustomMessage from '@/interfaces/assist/CustomMessage';
import FetchClient from '@/interfaces/http/FetchClient';

export interface CustomMessagesSlice {
  customMessages: InstitutionItems<CustomMessage>,
  fetchCustomMessages: (instituteIds: string[], url: string, httpClient: FetchClient) => Promise<void>,
}

export const createCustomMessagesSlice: StoreSlice<CustomMessagesSlice> = set => ({
  customMessages: {},
  fetchCustomMessages: async (instituteIds, url, httpClient) => {
    const promises = instituteIds.map(async id => {
      try {
        const { assistMessages } = await httpClient.get<{
          assistMessages: CustomMessage[],
        }>(`${url}`.replace(/{instituteId}/g, id));
        return [id, assistMessages];
      } catch (e) {
        return [id, []];
      }
    });
    const items = await Promise.all(promises);
    const customMessages = Object.fromEntries(items);
    set({ customMessages });
    return customMessages;
  },
});
