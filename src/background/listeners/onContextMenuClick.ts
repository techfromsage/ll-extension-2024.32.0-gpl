/**
 * Register listener for when a context menu click (aka right click) happens.
 */
import browserMethods from '@/browserMethods';
import { store } from '@/store';
import SelectedTextSearch from '@/modules/searchEnhancers/SelectedTextSearch';

export default (compoundId: string, selectionText: string) => {
  const { institutes } = store.getState();
  SelectedTextSearch.handleClick(
    compoundId,
    selectionText,
    institutes,
    browserMethods.tabs.background.create,
  );
};
