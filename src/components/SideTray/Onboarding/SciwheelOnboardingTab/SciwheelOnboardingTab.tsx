import React, { useContext } from 'react';
import bootstrap from '@bootstrap/index';
import SettingsFormReactContext from '@/components/Context/SettingsFormReactContext';
import Logo from '@/subComponents/Logo/Logo';
import InstituteLogo from '@/modules/shared/InstituteLogo';
import Button from '@/subComponents/Buttons/Button';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import AppActiveReactContext from '../../../Context/AppActiveReactContext';
import { ReferenceManagerVideo } from '../../ReferenceManager/ReferenceManagerOnboarding';

const SciwheelOnboardingTab = () => {
  const { sendSettingsFormsState } = useContext(SettingsFormReactContext);
  const { storeState } = useContext(AppActiveReactContext);
  const { institutes } = storeState;
  const [institution] = institutes;

  const handleLinkBack = () => {
    sendSettingsFormsState(SettingsFormEvent.Submit, { name: 'showPinTooltipTutorialTab', value: [true] });
    sendSettingsFormsState(SettingsFormEvent.Submit, { name: 'showSciwheelTutorialTab', value: [false] });
  };

  const handleClick = () => {
    sendSettingsFormsState(SettingsFormEvent.Submit, { name: 'showSciwheelTutorialTab', value: [false] });
  };

  const handleAuthRedirect = () => {
    window.open(`${bootstrap.api.sciwheel.base}/work/signin`, '_blank', 'noopener,noreferrer');
    sendSettingsFormsState(SettingsFormEvent.Submit, { name: 'showSciwheelTutorialTab', value: [false] });
  };

  return (
    <div className="container-sciwheel-onboarding">
      <div className="container-sciwheel-onboarding__layout">
        <div className="container-sciwheel-onboarding__container">
          <button
            className="container-sciwheel-onboarding__link"
            onClick={handleLinkBack}
            type="button"
            data-testid="Button-Back"
            aria-label="Back"
            aria-describedby="back-button-screen-reader-description"
          >
            Back
          </button>
          <div className="container-sciwheel-onboarding__frame">
            <div>
              <Logo
                type="sidetray"
                src={InstituteLogo(institution)}
                alt="Institution Logo"
              />
            </div>
            <ReferenceManagerVideo />
            <div className="container-sciwheel-onboarding__action-wrapper">
              <Button
                className="button button-primary"
                onClick={handleAuthRedirect}
                text="Sign-up"
              />
              <Button
                className="button button-neutral"
                onClick={handleAuthRedirect}
                text="I already have an account"
              />
              <Button
                className="button button-maybe-later"
                onClick={handleClick}
                text="Maybe later"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SciwheelOnboardingTab;
