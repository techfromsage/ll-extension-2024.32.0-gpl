import AlarmMethods from '@/interfaces/browser/AlarmMethods';
import BrowserEvent from '@/enums/BrowserEvent';

const alarms: AlarmMethods = {
  background: {
    create: (alarmName, alarmInfo) => browser.alarms.create(alarmName, alarmInfo),
    get: alarmName => browser.alarms.get(alarmName),
    clearAll: () => browser.alarms.clearAll(),
    listeners: {
      onAlarm: callback => {
        browser.alarms.onAlarm.addListener(alarm => {
          callback(alarm.name as BrowserEvent);
        });
      },
    },
  },
};

export default alarms;
