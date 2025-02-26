/**
 * Methods for creating, getting and interacting with scheduled alarms/tasks
 *
 * e.g. update from APIs every X minutes.
 */
import BrowserEvent from '@/enums/BrowserEvent';

export interface AlarmInfo {
  periodInMinutes?: number,
  delayInMinutes?: number,
}

interface AlarmMethods {
  background: {
    get: (alarmName: BrowserEvent) => Promise<AlarmInfo | undefined>,
    create: (alarmName: BrowserEvent, alarmInfo: AlarmInfo) => void,
    clearAll: () => Promise<boolean>,
    listeners: {
      onAlarm: (callback: (alarmName: BrowserEvent) => void) => void,
    },
  },
}

export default AlarmMethods;
