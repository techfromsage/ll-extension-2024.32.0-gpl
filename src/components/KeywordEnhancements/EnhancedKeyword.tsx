import React, { useContext, useState } from 'react';
import { Keyword } from '@/interfaces/keywordEnhancements/KeywordPackage';
import Tooltip from '@/components/KeywordEnhancements/Tooltip';
import TooltipWrapper from '@/components/KeywordEnhancements/TooltipWrapper';
import TooltipTrigger from '@/components/KeywordEnhancements/TooltipTrigger';
import TooltipContent from '@/components/KeywordEnhancements/TooltipContent';
import { StateInterpreterKeywordEnhancements } from '@/modules/shared/stateMachine/StateMachineKeywordEnhancements';
import { useSelector } from '@xstate/react';
import AppActiveState from '@/enums/stateMachine/AppActiveState';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import browserMethods from '@/browserMethods';
import FuturesStatType from '@/enums/FuturesStatType';

interface Props {
  stateInterpreterKeywordEnhancements: StateInterpreterKeywordEnhancements,
  keyword: Keyword,
  originalKeyword: string,
}

let timerId: NodeJS.Timeout;

// Send hover event if the user hovers over the keyword for more than 1.5 seconds
const sendHoverEvent = (open: boolean, moduleUuid: string, institution: string) => {
  clearTimeout(timerId);
  if (open) {
    timerId = setTimeout(() => browserMethods.app.statEventFutures({
      type: FuturesStatType.KeywordEnhancementHovered,
      module_uuid: moduleUuid,
      trigger_url: window.location.href,
      institute_id: institution,
    }), 1500);
  }
};

const EnhancedKeyword = ({
  stateInterpreterKeywordEnhancements, keyword, originalKeyword,
}: Props) => {
  const { keywordPackage, enabled } = useSelector(stateInterpreterKeywordEnhancements, state => state.context);
  const [open, setOpen] = useState(false);
  const { storeState: { appSettings, institutes }, appActive } = useContext(AppActiveReactContext);

  const onOpenChange = (openState: boolean) => {
    sendHoverEvent(openState, keywordPackage.uuid, institutes[0].id);
    setOpen(openState);
  };
  return (appActive === AppActiveState.Off || !appSettings.keywordEnhancements.enabled || !enabled)
    ? <>{originalKeyword}</>
    : (
      <TooltipWrapper open={open} onOpenChange={onOpenChange}>
        <TooltipTrigger
          onClick={() => setOpen(v => !v)}
          backgroundColor={keywordPackage.color}
        >
          {originalKeyword}
        </TooltipTrigger>
        <TooltipContent>
          <Tooltip
            logo={keywordPackage.logo}
            packageName={keywordPackage.name}
            title={keyword.name}
            description={keyword.definition}
            link={keyword.link}
            buttonText={keywordPackage.button_text}
            keywordPackageUuid={keywordPackage.uuid}
          />
        </TooltipContent>
      </TooltipWrapper>
    );
};

export default EnhancedKeyword;
