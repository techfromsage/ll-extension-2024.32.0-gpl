import React, { useContext } from 'react';
import notActive from '@/assets/img/notActive.png';
import globalDeny from '@/assets/img/globalDeny.png';
import browserMethods from '@/browserMethods';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import LayoutState from '@/enums/stateMachine/LayoutState';
import AppActiveState from '@/enums/stateMachine/AppActiveState';

const AppOff = ({ state }: { state: AppActiveState }) => {
  const { layoutValues } = useContext(LayoutReactContext);

  const wrapperClass = [
    'app-off',
    layoutValues.layout !== LayoutState.PopUp && 'app-off--large',
  ].filter(Boolean);
  return (
    <div className={wrapperClass.join(' ')} data-testid="AppOff">
      <img
        className="app-off__image"
        alt="App is off"
        src={`${state === AppActiveState.Off
          ? browserMethods.runtime.getURL(notActive)
          : browserMethods.runtime.getURL(globalDeny)
        }`}
      />
      <div className="app-off__content">
        <h3>Extension paused</h3>
        { state === AppActiveState.Off && <p>The extension is on pause, toggle it back on to continue to use Lean Library.</p> }
        { state === AppActiveState.GlobalDeny && <p>The extension does not work on this site.</p> }
      </div>
    </div>
  );
};

export default AppOff;
