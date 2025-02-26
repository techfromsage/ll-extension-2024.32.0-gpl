import React from 'react';
import root from 'react-shadow/emotion';
import { useSelector } from '@xstate/react';
import { StateInterpreterAppActive } from '@/modules/shared/stateMachine/StateMachineAppActive';
import { selectStore } from './selectors';
import generateCustomCss from './generateCustomCss';
import './ShadowKeywordEnhancementsTooltip.scss';

interface Props {
  stateInterpreterAppActive: StateInterpreterAppActive,
}

const ShadowKeywordEnhancementsContainer = ({ stateInterpreterAppActive }: Props) => {
  const storeState = useSelector(stateInterpreterAppActive, selectStore);
  /** General customization */
  const { appSettings: { customizations } } = storeState;

  return (
    <root.div>
      <link rel="stylesheet" type="text/css" href={chrome.runtime.getURL('contentScript.css')} />
      <style type="text/css">
        {generateCustomCss(customizations)}
      </style>
    </root.div>
  );
};

export default ShadowKeywordEnhancementsContainer;
