/**
 * Handles browser periodic alarms/tasks behaviour when alarms are triggered to run.
 */
import BrowserEvent from '@/enums/BrowserEvent';
import { statStore, store } from '@/store';
import bootstrap from '@bootstrap/index';
import HTTPRequestPost from '@/modules/shared/http/HTTPRequestPost';
import Options from '@/interfaces/http/Options';
import sendStatDataAccess from '@/modules/stats/sendStatDataAccess';
import sendStatDataFutures from '@/modules/stats/sendStatDataFutures';
import AuthenticatedHTTPRequestPost from '@/modules/shared/AuthenticatedHTTPRequestPost';
import HTTPRequestDelete from '@/modules/shared/http/HTTPRequestDelete';
import alarmInstalledInstitutions from '@/background/alarms/alarmInstalledInstitutions';
import updateData from './updateData';

export default async (alarmName: BrowserEvent) => {
  if (alarmName === BrowserEvent.AlarmSendStats) {
    const {
      statEventsAccess,
      statEventsFutures,
      clearStatEventsAccess,
      clearStatEventsFutures,
    } = statStore.getState();
    await sendStatDataAccess(
      (options: Options) => HTTPRequestPost(bootstrap.api.llaEvent, options),
      statEventsAccess,
      clearStatEventsAccess,
    );

    const { token, url } = bootstrap.api.llApi;
    await sendStatDataFutures(
      (path, method, options) => {
        const client = method === 'POST' ? HTTPRequestPost : HTTPRequestDelete;
        return AuthenticatedHTTPRequestPost(token, client)(`${url}${path}`, options);
      },
      statEventsFutures,
      clearStatEventsFutures,
    );
    return;
  }

  if (alarmName === BrowserEvent.AlarmRefreshData) {
    await updateData();
    return;
  }

  if (alarmName === BrowserEvent.AlarmInstalledInstitutions) {
    alarmInstalledInstitutions(store.getState(), statStore.getState());
  }

  if (alarmName === BrowserEvent.AlarmClearSignedInDomains) {
    store.getState().clearSignedInDomains();
  }
};
