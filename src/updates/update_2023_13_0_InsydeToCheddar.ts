import StoreNamespace from '@/enums/StoreNamespace';
import BrowserMethods from '@/interfaces/browser/BrowserMethods';
import { StoreState } from '@/store';

interface InsydeState {
  state: {
    settings: {
      id?: string,
      institutes?: string[],
    },
  },
}

/**
 * Migrate Insyde to Cheddar.
 * This can be removed once Insyde is no longer used.
 */
export default async (previousYear: number, browserMethods: BrowserMethods, store: StoreState) => {
  if (previousYear === 2022) {
    const res = await browserMethods.storage.getItem<InsydeState>('state');
    if (!res.state) {
      return;
    }

    if (res.state.settings.institutes?.length) {
      await browserMethods.storage.setItem(StoreNamespace.InstituteIds, res.state.settings.institutes);
    }
    if (res.state.settings.id) {
      const { setClientId } = store;
      setClientId(res.state.settings.id);
    }

    await browserMethods.storage.removeItem('state');
  }
};
