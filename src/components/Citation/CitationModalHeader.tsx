import React, { useContext } from 'react';
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import LayoutReactContext from '@/components/Context/LayoutReactContext';

const CitationModalHeader = () => {
  const { sendLayoutState } = useContext(LayoutReactContext);

  return (
    <button
      className="button-as-text"
      onClick={() => sendLayoutState(LayoutEvent.CloseCitationModal)}
      type="button"
      data-testid="Button-Done"
      aria-label="Done"
      aria-describedby="done-button-screen-reader-description"
    >
      <div id="done-button-screen-reader-description" className="screen-reader-only">
        Clicking this will close the citation modal.
      </div>
      Done
    </button>
  );
};

export default CitationModalHeader;
