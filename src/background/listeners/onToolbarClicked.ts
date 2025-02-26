/**
 * Register listener for when the toolbar icon is clicked
 */
import browserMethods from '@/browserMethods';

export default (tabId: number) => browserMethods.popup.background.toggle(tabId);
