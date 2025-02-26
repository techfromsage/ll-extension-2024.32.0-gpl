import { render } from 'react-dom';
import React from 'react';
import { Keyword } from '@/interfaces/keywordEnhancements/KeywordPackage';
import EnhancedKeyword from '@/components/KeywordEnhancements/EnhancedKeyword';
import { StateInterpreterKeywordEnhancements } from '@/modules/shared/stateMachine/StateMachineKeywordEnhancements';
import ShadowTextHighlighter from './ShadowTextHighlighter';

/**
 * Creates, renders and appends the Shadow DOM element.
 */

const createShadowKeywordEnhancements = (
  node: HTMLElement | null,
  stateInterpreterKeywordEnhancements: StateInterpreterKeywordEnhancements,
  keyword: Keyword,
  originalKeyword: string,
) => {
  if (node) {
    render(
      <ShadowTextHighlighter
        stateInterpreterAppActive={window.stateInterpreterAppActive}
        stateInterpreterLayout={window.stateInterpreterLayout}
      >
        <EnhancedKeyword
          stateInterpreterKeywordEnhancements={stateInterpreterKeywordEnhancements}
          keyword={keyword}
          originalKeyword={originalKeyword}
        />
      </ShadowTextHighlighter>,
      node,
    );
  }
};

export default createShadowKeywordEnhancements;
