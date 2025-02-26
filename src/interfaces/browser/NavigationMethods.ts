/**
 * Interface NavigationMethods standardizes navigation behaviour between browsers.
 */
interface NavigationMethods {
  onBeforeNavigate: (callback: (tabId: number, url: string) => void) => void,
  onCompleted: (callback: (tabId: number, url: string) => void) => void,
  onCommitted: (callback: (tabId: number, url: string) => void) => void,
}

export default NavigationMethods;
