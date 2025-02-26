import React, { useContext } from 'react';
import LayoutState from '@/enums/stateMachine/LayoutState';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import Loading from '@/components/App/Loading';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import ShadowList from '@/enums/ShadowList';
import CitationReactContext from '@/components/Context/CitationReactContext';
import CitationState from '@/enums/stateMachine/CitationState';
import FocusTrap from 'focus-trap-react';
import CitationModalBody from '@/components/Citation/CitationModalBody';
import CitationModalHeader from '@/components/Citation/CitationModalHeader';
import CitationModalError from './CitationModalError';

interface Props {
  notifications: NotificationUI[],
}

const CitationModal = ({ notifications }: Props) => {
  const { layoutValues } = useContext(LayoutReactContext);
  const { citationModal } = layoutValues;
  const closing = citationModal === LayoutState.CitationModalClosing;

  const { citationValue } = useContext(CitationReactContext);

  const classes = [
    'layout',
    'layout--citation-modal',
    'layout--fixed',
    closing && 'animate--slide-left',
    !closing && 'animate--slide-right',
  ].filter(Boolean);

  return (
    <FocusTrap>
      <div className="layout__backdrop" id={ShadowList.LayoutBackdrop}>
        <div data-testid={citationModal} className={classes.join(' ')} data-test-selector="LayoutInner">
          {citationValue === CitationState.Fetching && <Loading text="🤖 Fetching citation..." asOverlay />}
          <div className="layout__container layout__container--citation-modal">
            <div className="layout__content layout__content--citation-modal" data-testid="LayoutContent">
              {citationValue === CitationState.Failed
                ? <CitationModalError />
                : <CitationModalBody notifications={notifications} />}
            </div>
            <div className="layout__header layout__header--citation-modal">
              <CitationModalHeader />
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};

export default CitationModal;
