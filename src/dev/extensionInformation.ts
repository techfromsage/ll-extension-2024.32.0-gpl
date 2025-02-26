import { StoreState } from '@/store';
import parser from 'ua-parser-js';

declare const navigator: any;

/**
 * extensionInformation
 */
export default (storeState: StoreState) => {
  const {
    currentIp, appSettings, config, institutes,
  } = storeState;

  const userAgent = navigator ? navigator.userAgent : 'other';
  const browserInfo = parser(userAgent);
  const device = [browserInfo.device.vendor, browserInfo.device.type, browserInfo.device.model].filter(Boolean);
  const os = [browserInfo.os.name, browserInfo.os.version].filter(Boolean);
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  return [
    ['Extension version', config?.version],
    ['Build environment', process.env.NODE_ENV],
    ['Browser', `${browserInfo.browser.name} ${browserInfo.browser.version}`],
    ['OS', os.join(' ')],
    ['Device', device.join(' ')],
    ['Your IP address', currentIp],
    ['Status', appSettings.onCampus ? 'On-campus' : 'Off-campus'],
    ['Network onchange listener', connection?.onchange ? 'Yes' : 'No'],
    ['Multiple institutions', institutes.length > 1 ? 'Yes' : 'No'],
  ];
};
