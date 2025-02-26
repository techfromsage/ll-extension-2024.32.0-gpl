import AlarmMethods from '@/interfaces/browser/AlarmMethods';
import BrowserEvent from '@/enums/BrowserEvent';

const alarms: AlarmMethods = {
  background: {
    create: (alarmName, alarmInfo) => chrome.alarms.create(alarmName, alarmInfo),
    get: alarmName => chrome.alarms.get(alarmName),
    clearAll: () => chrome.alarms.clearAll(),
    listeners: {
      onAlarm: callback => {
        chrome.alarms.onAlarm.addListener(alarm => {
          callback(alarm.name as BrowserEvent);
        });
      },
    },
  },
};

export default alarms;
