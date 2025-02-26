import React, { useContext } from 'react';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import LayoutState from '@/enums/stateMachine/LayoutState';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import AppActiveState from '@/enums/stateMachine/AppActiveState';
import Content from '@/modules/shared/Content';
import InstituteLogo from '@/modules/shared/InstituteLogo';
import SideTray from '@/components/SideTray/SideTray';
import AppOff from '@/components/App/AppOff';
import SettingsTab from '@/components/SideTray/SettingsTab';
import NotificationsTab from '@/components/SideTray/NotificationsTab';
import ReferenceManagerTab from '@/components/SideTray/ReferenceManagerTab';
import Logo from '@/subComponents/Logo/Logo';
import Footer from '@/subComponents/Footer/Footer';

interface Props {
  notifications: NotificationUI[],
  layout: LayoutState,
  isOptions?: boolean,
}

interface PanelProps {
  appActive: AppActiveState,
  layout: LayoutState,
  notifications: NotificationUI[],
}

const PanelContent = ({ appActive, layout, notifications }: PanelProps) => {
  if (layout === LayoutState.Settings) {
    return (<SettingsTab />);
  }

  if (layout === LayoutState.ReferenceManager) {
    return (<ReferenceManagerTab />);
  }

  if (appActive === AppActiveState.Off || appActive === AppActiveState.GlobalDeny) {
    return <AppOff state={appActive} />;
  }

  return <NotificationsTab notifications={notifications} />;
};

const SideTrayPanel = ({ notifications, layout, isOptions }: Props) => {
  const { appActive, storeState } = useContext(AppActiveReactContext);
  const { institutes } = storeState;
  const [institution] = institutes;

  const footerText = institutes.length > 0 && Content(institution.id, 'footer', storeState.content);
  const footer = <Footer text={footerText || undefined} />;

  return (
    <SideTray footer={footer} isOptions={isOptions}>
      <div data-testid="SideTrayPanel" className="width-100 flex-column">
        <Logo
          type="sidetray"
          src={InstituteLogo(institution)}
          alt="Institution Logo"
        />
        <PanelContent appActive={appActive} layout={layout} notifications={notifications} />
      </div>
    </SideTray>
  );
};

export default SideTrayPanel;
