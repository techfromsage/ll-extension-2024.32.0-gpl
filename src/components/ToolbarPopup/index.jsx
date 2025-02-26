import ToolbarPopup from './ToolbarPopup';
import PermissionsSwitch from '../PermissionsSwitch/PermissionsSwitch';
import browserMethods from "@/browserMethods";

browserMethods.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const [tab] = tabs;
  PermissionsSwitch(ToolbarPopup, tab.url || '');
});

