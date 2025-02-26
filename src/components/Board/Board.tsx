import React, { useContext } from 'react';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import Logo from '@/subComponents/Logo/Logo';
import InstituteLogo from '@/modules/shared/InstituteLogo';
import Button from '@/subComponents/Buttons/Button';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import SettingsFormReactContext from '@/components/Context/SettingsFormReactContext';
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';

interface Props {
  title: string,
  closing: boolean,
  children: JSX.Element | JSX.Element[],
}

/**
 * @param {boolean} closing
 * @param {JSX.Element | JSX.Element[]} children
 * @returns {JSX.Element}
 * @constructor
 */
const Board = ({ title, closing, children }: Props) => {
  const { sendSettingsFormsState } = useContext(SettingsFormReactContext);
  const { storeState: { institutes, appSettings } } = useContext(AppActiveReactContext);
  const { layoutValues } = useContext(LayoutReactContext);

  const classes = [
    'layout',
    'layout--board',
    'layout__wrapper',
    closing && 'dissolve',
  ].filter(Boolean).join(' ');

  const onCloseClick = () => {
    sendSettingsFormsState(SettingsFormEvent.Submit, { name: 'librarySearch', value: [false] });
    window.stateInterpreterLayout.send(LayoutEvent.CloseLibrarySearch);
  };

  return (
    <div className={layoutValues.screenSize} data-testid="LayoutBoard">
      <div className={appSettings.customTextSize}>
        <div
          data-testid="Board"
          data-test-selector="LayoutInner"
          className={classes}
          style={{ display: 'none' }}
        >
          <div className="layout__container">
            <div className="layout__header layout__header--board">
              <Logo src={InstituteLogo(institutes[0])} type="board" alt="Institution Logo" />
              <nav className="navigation navigation--board" data-testid="Navigation">
                <ul className="navigation__list">
                  <li className="navigation__item">
                    <Button
                      className="close"
                      hiddenText
                      text="Close"
                      onClick={onCloseClick}
                    />
                  </li>
                </ul>
              </nav>
            </div>

            <div className="layout__content layout__content--board" data-testid="LayoutContent">
              <h2 className="heading">{title}</h2>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
