import React from 'react';
import AppActiveState from '@/enums/stateMachine/AppActiveState';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import SettingsFormReactContext from '@/components/Context/SettingsFormReactContext';
import ReferenceManagerReactContext from '@/components/Context/ReferenceManagerReactContext';
import CitationReactContext from '@/components/Context/CitationReactContext';
import SideTray from '@/components/SideTray/SideTray';
import SetupPanel from '@/components/SideTray/SetupPanel';
import Popup from '@/components/Popup/Popup';
import Setup, { RenderElementProps } from '../Shadow/Setup';
import generateCustomCss from '../Shadow/generateCustomCss';
import '../Shadow/shadow.scss';

const ToolbarPopupElement = ({
  storeState,
  settingsFormContext,
  appActiveContext,
  layoutContext,
  layoutValues,
  appActive,
  notifications,
  citationContext,
  referenceManagerContext,
}: RenderElementProps) => {
  const {
    appSettings: { customizations },
    institutionsList,
  } = storeState;

  const popup = notifications[0];

  return (
    <>
      <div className={`${layoutValues.screenSize}`}>
        <div className={storeState.appSettings.customTextSize}>
          <SettingsFormReactContext.Provider value={settingsFormContext}>
            <AppActiveReactContext.Provider value={appActiveContext}>
              <LayoutReactContext.Provider value={layoutContext}>
                <CitationReactContext.Provider value={citationContext}>
                  <ReferenceManagerReactContext.Provider value={referenceManagerContext}>
                    {appActive === AppActiveState.NoInstitutionsSelected
                  || appActive === AppActiveState.FetchInstitutionData ? (
                    <SideTray isOptions>
                      <SetupPanel institutionsList={institutionsList} isToolbar />
                    </SideTray>
                      ) : (
                        <Popup
                          notification={popup}
                          closing={false}
                          isToolbar
                          hideHomeIcon
                          close={() => { window.close(); }}
                        />
                      )}
                  </ReferenceManagerReactContext.Provider>
                </CitationReactContext.Provider>
              </LayoutReactContext.Provider>
            </AppActiveReactContext.Provider>
          </SettingsFormReactContext.Provider>
        </div>
      </div>
      <link rel="stylesheet" type="text/css" href={chrome.runtime.getURL('popup.css')} />
      <style type="text/css">
        {generateCustomCss(customizations)}
      </style>
    </>
  );
};

const ToolbarPopup = ({
  stateInterpreterLayout,
  stateInterpreterAppActive,
  stateInterpreterSettingsForm,
  stateInterpreterCitation,
  stateInterpreterReferenceManager,
  stateInterpreterHighlightAndAnnotate,
}: any) => {
  return Setup({
    stateInterpreterLayout,
    stateInterpreterAppActive,
    stateInterpreterSettingsForm,
    stateInterpreterCitation,
    stateInterpreterReferenceManager,
    stateInterpreterHighlightAndAnnotate,
    RenderElement: ToolbarPopupElement,
  });
};

export default ToolbarPopup;
