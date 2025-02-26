import React, { useContext } from 'react';
import InformationPip from '@/subComponents/InformationPip/InformationPip';
import CheckCircleIcon from '@/icons/CheckCircleIcon';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import { OpenAccessSource } from '@/interfaces/ui/OpenAccessUI';
import Content from '@/modules/shared/Content';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';

interface Props {
  notification: NotificationUI,
}

const NotificationInformation = ({ notification }: Props) => {
  const { storeState } = useContext(AppActiveReactContext);

  const openAccessMessage = () => {
    const { openAccess } = notification;
    if (openAccess) {
      const version = openAccess.version ? ` · ${openAccess.version}` : '';
      const source = openAccess.source === OpenAccessSource.Core
        ? Content(notification.institution.id, 'infoOpenAccessCore', storeState.content)
        : openAccess.source;
      return `${source}${version}`;
    }

    return undefined;
  };

  return (
    <div>
      { openAccessMessage() && (
        <InformationPip
          text={openAccessMessage()}
          icon={<CheckCircleIcon fill="#3B55AF" />}
          testId="openAccessMessage"
        />
      )}
    </div>
  );
};

export default NotificationInformation;
