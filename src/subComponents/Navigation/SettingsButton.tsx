import React from 'react';
import browserMethods from '@/browserMethods';
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import Button from '@/subComponents/Buttons/Button';

interface Props {
  isDisabled: boolean,
  sendLayoutState: (event: LayoutEvent) => void,
}

const SettingsButton = ({ isDisabled, sendLayoutState }: Props) => {
  const extensionInfo = new URL(browserMethods.runtime.getURL('/'));
  const isReservedPage = window.location.protocol === extensionInfo.protocol;

  const settingsOnClick = !isReservedPage
    ? () => {
      sendLayoutState(LayoutEvent.Settings);
    }
    : () => {
      browserMethods.runtime.openOptionsPage();
    };

  return (
    <Button
      className="settings"
      hiddenText
      disabled={isDisabled}
      onClick={settingsOnClick}
      text="Settings"
    />
  );
};

export default SettingsButton;
