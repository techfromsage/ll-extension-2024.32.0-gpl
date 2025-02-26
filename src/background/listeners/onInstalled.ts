import parser from 'ua-parser-js';
import { store } from '@/store';
import BrowserEvent from '@/enums/BrowserEvent';
import browserMethods from '@/browserMethods';
import HTTPClient from '@/modules/shared/http/HTTPClient';
import bootstrap from '@bootstrap/index';

import { openOnboardingTutorial } from '@/background/listeners/onUpdateInstitutions';
import StoreNamespace from '@/enums/StoreNamespace';
import SeededRandomGenerator from '@/modules/shared/SeededRandomGenerator';
import updateData from './updateData';
import onUpdate from './onUpdate';

const registerAlarms = () => {
  browserMethods.alarms.background.clearAll().then(() => {
    browserMethods.alarms.background.create(BrowserEvent.AlarmRefreshData, { periodInMinutes: 15.0 });
    browserMethods.alarms.background.create(BrowserEvent.AlarmSendStats, { periodInMinutes: 1.0 });
    browserMethods.alarms.background.create(BrowserEvent.AlarmClearSignedInDomains, { periodInMinutes: 1440.0 });

    const randomG = SeededRandomGenerator(store.getState().clientId);
    const randomNumber = (Math.random() + randomG()) % 1;
    const offset = Math.round(randomNumber * 60.0);

    browserMethods.alarms.background.create(
      BrowserEvent.AlarmInstalledInstitutions,
      { periodInMinutes: 60, delayInMinutes: offset },
    );
  });
};

/**
 * Safari doesn't request permissions in the same way Firefox and Chrome do.
 * Instead, we register our intent for the extension to show on all url
 * and Safari will show a popup when the user first opens a page.
 * In Firefox, the popup shows when the user clicks the "review permissions" button.
 */
const requestPermissionsIfSafari = () => {
  const userAgent = navigator ? navigator.userAgent : 'other';
  const browserInfo = parser(userAgent);
  if (browserInfo.browser.name === 'Safari') {
    browserMethods.permissions.background.request({ origins: ['<all_urls>'] });
  }
};

/**
 * Handler for when the extension is freshly installed.
 */
const handleInstall = async () => {
  const { fetchCurrentIp, fetchDefaultInstitution } = store.getState();

  await fetchCurrentIp(bootstrap.api.ip, HTTPClient);
  const defaultInstitution = await fetchDefaultInstitution(HTTPClient);

  if (!defaultInstitution) {
    browserMethods.runtime.openOptionsPage();
    return;
  }

  browserMethods.storage.setItem(StoreNamespace.InstituteIds, [defaultInstitution]);
  const { storeState } = await updateData();
  if (storeState.institutes[0].showExtensionSettings) {
    browserMethods.runtime.openOptionsPage();
    openOnboardingTutorial(storeState.institutes[0]);
  }
};

/**
 * Handler for when the extension is installed or upgraded.
 */
export default async (installDetails: browser.runtime._OnInstalledDetails | chrome.runtime.InstalledDetails) => {
  registerAlarms();
  requestPermissionsIfSafari();

  if (installDetails.reason === 'install') {
    await handleInstall();
  } else {
    await onUpdate(installDetails.previousVersion || '');
  }
};
