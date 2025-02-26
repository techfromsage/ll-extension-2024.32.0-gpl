import { render } from 'react-dom';
import React from 'react';
import ShadowKeywordEnhancementsContainer from '@/components/Shadow/ShadowKeywordEnhancementsContainer';
import ShadowList from '@/enums/ShadowList';

const id = ShadowList.KeywordEnhancementsContainer;

export const destroyShadowKeywordEnhancementsContainer = () => {
  document.getElementById(id)?.remove();
};

/**
 * Creates, renders and appends the keyword enhancements wrapper shadow DOM element.
 * This is where the keyword enhancements tooltips will be rendered
 * using floating UI portal.
 */
const createShadowKeywordEnhancementsContainer = () => {
  if (!document.getElementById(id)) {
    const newDiv = document.createElement('div');
    newDiv.id = id;
    document.body.append(newDiv);
    render(<ShadowKeywordEnhancementsContainer
      stateInterpreterAppActive={window.stateInterpreterAppActive}
    />, newDiv);
  }
};

export default createShadowKeywordEnhancementsContainer;
