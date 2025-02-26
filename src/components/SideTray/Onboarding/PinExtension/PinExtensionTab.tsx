import React, { useContext } from 'react';
import SettingsFormReactContext from '@/components/Context/SettingsFormReactContext';
import browserMethods from '@/browserMethods';
import Logo from '@/subComponents/Logo/Logo';
import InstituteLogo from '@/modules/shared/InstituteLogo';
import Button from '@/subComponents/Buttons/Button';
import image from '@/assets/svg/pinExtensionGuide.svg';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';

const PinExtensionTab = () => {
  const { sendSettingsFormsState } = useContext(SettingsFormReactContext);
  const { storeState } = useContext(AppActiveReactContext);
  const { institutes } = storeState;
  const [institution] = institutes;

  const handleLinkBack = () => {
    sendSettingsFormsState(SettingsFormEvent.Submit, { name: 'showPinTooltipTutorialTab', value: [false] });
    sendSettingsFormsState(SettingsFormEvent.Submit, { name: 'institutions', value: [institutes[0].id] });
  };

  const handleClick = () => {
    sendSettingsFormsState(SettingsFormEvent.Submit, { name: 'showSciwheelTutorialTab', value: [true] });
    sendSettingsFormsState(SettingsFormEvent.Submit, { name: 'showPinTooltipTutorialTab', value: [false] });
  };

  return (
    <div className="container-extension">
      <div className="container-extension__layout">
        <div className="pin-extension__container">
          <button
            className="pin-extension__link"
            onClick={handleLinkBack}
            type="button"
            data-testid="Button-Back"
            aria-label="Back"
            aria-describedby="back-button-screen-reader-description"
          >
            Back
          </button>
          <div className="pin-extension__frame">
            <div>
              <Logo
                type="sidetray"
                src={InstituteLogo(institution)}
                alt="Institution Logo"
              />
              <div className="pin-extension__heading-wrapper">
                <h1
                  data-testid="pinExtension"
                  className="heading pin-extension__heading"
                >
                  Pin Lean Library for quick access
                </h1>
              </div>
              <div className="pin-extension__image">
                <img
                  className="pin-extension__svg"
                  alt="pin extension screenshot"
                  src={`${browserMethods.runtime.getURL(image)}`}
                />
              </div>
            </div>
            <Button
              className="button button-primary"
              onClick={handleClick}
              text="Next"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinExtensionTab;
