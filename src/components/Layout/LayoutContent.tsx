import React, { useContext } from 'react';
import AppActiveState from '@/enums/stateMachine/AppActiveState';
import LayoutState from '@/enums/stateMachine/LayoutState';
import SideTray from '@/components/SideTray/SideTray';
import SetupPanel from '@/components/SideTray/SetupPanel';
import Popup from '@/components/Popup/Popup';
import SideTrayPanel from '@/components/SideTray/SideTrayPanel';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import Modal from '@/components/Modal/Modal';

const LayoutContent = (): JSX.Element => {
  const { layoutValues, notifications, modalNotification } = useContext(LayoutReactContext);
  const {
    appActive, storeState: { institutionsList },
  } = useContext(AppActiveReactContext);
  const { layout, openedClosed } = layoutValues;
  const isClosed = openedClosed === LayoutState.Closed;
  const isClosing = openedClosed === LayoutState.Closing;

  if ([
    AppActiveState.NoInstitutionsSelected,
    AppActiveState.FetchBaseData,
  ].includes(appActive)) {
    return (
      <SideTray>
        <SetupPanel institutionsList={institutionsList} />
      </SideTray>
    );
  }

  const [popup] = notifications;

  if (layout === LayoutState.PopUp) {
    return <Popup notification={popup} closing={isClosing} isToolbar={false} />;
  }
  if (layout === LayoutState.Modal && modalNotification) {
    return <Modal notification={modalNotification} closed={isClosed} />;
  }
  return <SideTrayPanel notifications={notifications} layout={layout} />;
};

export default LayoutContent;
