import React, { useContext, useState } from 'react';
import HighlightAndAnnotateWrapper from '@/components/HighlightAndAnnotate/HighlightAndAnnotateWrapper';
import AppActiveState from '@/enums/stateMachine/AppActiveState';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import HighlightAndAnnotateTrigger from '@/components/HighlightAndAnnotate/HighlightAndAnnotateTrigger';
import HighlightAndAnnotateContent from '@/components/HighlightAndAnnotate/HighlightAndAnnotateContent';
import ColorPalette from '@/components/ColorPalette/ColorPalette';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import Annotation from '@/interfaces/highlightAndAnnotate/Annotation';
import AnnotationCard from '../Annotation/AnnotationCard';

interface Props {
  annotation?: Annotation,
}

const HighlightedTextWrapper = ({ annotation }: Props) => {
  const [open, setOpen] = useState(!annotation);
  const { storeState: { appSettings }, appActive } = useContext(AppActiveReactContext);
  const { layoutValues } = useContext(LayoutReactContext);

  const onOpenChange = (openState: boolean) => {
    setOpen(openState);
  };

  return (
    <HighlightAndAnnotateWrapper open={open} onOpenChange={onOpenChange}>
      {
        (appActive === AppActiveState.On && appSettings.highlightAndAnnotateEnabled)
          && (
            <>
              <HighlightAndAnnotateTrigger asOverlay={!!annotation} />
              <HighlightAndAnnotateContent>
                <div className={layoutValues.screenSize}>
                  <div className={appSettings.customTextSize}>
                    { annotation ? <AnnotationCard annotation={annotation} /> : <ColorPalette /> }
                  </div>
                </div>
              </HighlightAndAnnotateContent>
            </>
          )
      }
    </HighlightAndAnnotateWrapper>
  );
};

export default HighlightedTextWrapper;
