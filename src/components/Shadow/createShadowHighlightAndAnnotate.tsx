import { render } from 'react-dom';
import React from 'react';
import HighlightedTextWrapper from '@/components/HighlightAndAnnotate/HighlightedTextWrapper';
import Annotation from '@/interfaces/highlightAndAnnotate/Annotation';
import ShadowTextHighlighter from './ShadowTextHighlighter';

/**
 * Creates, renders and appends the Shadow DOM element.
*/

const createShadowHighlightAndAnnotate = (
  node: HTMLElement,
  originalText: string,
  annotation?: Annotation,
) => {
  if (node) {
    render(
      <>
        {originalText}
        <ShadowTextHighlighter
          stateInterpreterAppActive={window.stateInterpreterAppActive}
          stateInterpreterLayout={window.stateInterpreterLayout}
        >
          <HighlightedTextWrapper annotation={annotation} />
        </ShadowTextHighlighter>
      </>,
      node,
    );
  }
};

export default createShadowHighlightAndAnnotate;
