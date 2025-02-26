import React, { ReactNode } from 'react';
import FocusTrap from 'focus-trap-react';
import ShadowList from '@/enums/ShadowList';

interface OverlayModalProps {
  closing: boolean,
  children: ReactNode,
}

const OverlayModal = ({ closing, children }: OverlayModalProps) => {
  const classes = [
    'modal',
    'layout',
    'layout--overlay-modal',
    'layout--fixed',
    'scrollbar',
    closing && 'animate--slide-left',
    !closing && 'animate--slide-right',
  ].filter(Boolean);
  return (
    <FocusTrap>
      <div className="layout__backdrop" id={ShadowList.LayoutBackdrop}>
        <div
          id="modal-dialog"
          className={classes.join(' ')}
        >
          {children}
        </div>
      </div>
    </FocusTrap>
  );
};

export default OverlayModal;
