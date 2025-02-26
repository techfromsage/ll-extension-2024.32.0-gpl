import React, { useContext } from 'react';
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import AppActiveEvent from '@/enums/stateMachine/AppActiveEvent';
import AppActiveState from '@/enums/stateMachine/AppActiveState';
import NotificationDot from '@/modules/shared/notifications/NotificationDot';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import ReferenceManagerReactContext from '@/components/Context/ReferenceManagerReactContext';
import ReferenceManagerState from '@/enums/stateMachine/ReferenceManagerState';
import Button from '../Buttons/Button';
import Switch from '../Switches/Switch';
import SettingsButton from './SettingsButton';
import NewTabButton from './NewTabButton';

interface Props {
  type: 'popup' | 'sidetray' | 'modal',
  hasNewtab?: boolean,
  onNewtab?: () => void,
  onClose?: () => void,
  hideHomeIcon?: boolean,
}

const Navigation = ({
  type,
  hasNewtab,
  onNewtab,
  onClose,
  hideHomeIcon,
}: Props) => {
  const { appActive, sendAppActiveState } = useContext(AppActiveReactContext);
  const { sendLayoutState, layoutEvent, notifications } = useContext(LayoutReactContext);
  const { referenceManager } = useContext(ReferenceManagerReactContext);
  const classes = [
    'navigation',
    `navigation--${type}`,
  ];
  const isDisabled = [
    AppActiveState.Loading,
    AppActiveState.NoInstitutionsSelected,
    AppActiveState.Init,
    AppActiveState.DeterminingPage,
  ].includes(appActive);

  const isNavigationItemActive = (activeLayout: boolean) => {
    return activeLayout ? 'navigation__item--active' : '';
  };

  const navigationDot = NotificationDot(notifications);

  return (
    <nav className={classes.join(' ')} data-testid="Navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          { appActive !== AppActiveState.GlobalDeny && (
          <Switch
            name="navigation_switch"
            text={appActive === AppActiveState.On ? 'On' : 'Paused'}
            pauseIcon
            className="navigation__switch"
            checked={[AppActiveState.On, AppActiveState.Loading].includes(appActive)}
            onClick={() => sendAppActiveState(AppActiveEvent.Toggle)}
            disabled={isDisabled}
          />
          )}
        </li>
        {!hideHomeIcon && (
          <li className={`
            navigation__item
            ${isNavigationItemActive(layoutEvent.type === LayoutEvent.ExpandNotifications
              || layoutEvent.type === LayoutEvent.Notifications)}
            ${navigationDot.active ? 'navigation__item--dot' : ''}`}
          >
            <Button
              className="notifications"
              hiddenText
              disabled={isDisabled}
              onClick={() => sendLayoutState(LayoutEvent.Notifications)}
              text="Home"
            />
          </li>
        )}
        {referenceManager !== ReferenceManagerState.Off && (
          <li className={`
            navigation__item
            ${isNavigationItemActive(layoutEvent.type === LayoutEvent.ReferenceManager)}
          `}
          >
            <Button
              className="referenceManager"
              hiddenText
              disabled={isDisabled}
              onClick={() => sendLayoutState(LayoutEvent.ReferenceManager)}
              text="Sciwheel"
            />
          </li>
        )}
        <li className={`
          navigation__item
          ${isNavigationItemActive(layoutEvent.type === LayoutEvent.Settings)}
        `}
        >
          <SettingsButton
            isDisabled={isDisabled}
            sendLayoutState={sendLayoutState}
          />
        </li>
        {type === 'sidetray'
          && (
          <li className="navigation__item">
            <Button
              className="minimise"
              hiddenText
              disabled={isDisabled}
              onClick={() => sendLayoutState(LayoutEvent.Minimise)}
              text="Return to message"
            />
          </li>
          )}
        <NewTabButton
          hasNewtab={hasNewtab}
          onNewtab={onNewtab}
          isDisabled={isDisabled}
        />
        <li className="navigation__item">
          <Button
            className="close"
            hiddenText
            onClick={() => {
              if (onClose) {
                onClose();
              }
              sendLayoutState(LayoutEvent.Close);
            }}
            text="Close popup"
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
