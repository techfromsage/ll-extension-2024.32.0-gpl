import React from 'react';
import browserMethods from '@/browserMethods';
import highlightingAndAnnotateEmpty from '@/assets/svg/highlightAndAnnotateEmpty.svg';

const HighlightAndAnnotateContentEmpty = () => {
  return (
    <div className="highlight-and-annotate highlight-and-annotate--empty">
      <img src={browserMethods.runtime.getURL(highlightingAndAnnotateEmpty)} alt="Pen highlighting some text" />
      <div className="highlight-and-annotate__content highlight-and-annotate__content--empty">
        <h3>
          Start annotating to see your highlights and notes here.
        </h3>
      </div>
    </div>
  );
};

export default HighlightAndAnnotateContentEmpty;
