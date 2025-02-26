/**
 * Windows functions
 */
import WindowMethods from '@/interfaces/browser/WindowMethods';

const windows: WindowMethods = {
  background: {
    listeners: {
      onCreated: callback => {
        chrome.windows.onCreated.addListener(() => {
          callback();
        });
      },
    },
  },
};

export default windows;
