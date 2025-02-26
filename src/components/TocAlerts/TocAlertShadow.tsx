import React from 'react';
import root from 'react-shadow';
import TocAlertButtonData from '@/interfaces/tocAlerts/TocAlertButtonData';
import './TocAlerts.scss';

interface Props {
  buttonData: TocAlertButtonData,
}

const TocAlertShadow: React.FC<Props> = ({ buttonData }: Props) => {
  return (
    <root.div>
      <link rel="stylesheet" type="text/css" href={chrome.runtime.getURL('contentScript.css')} />
      <a
        data-testid="TocAlertShadowButton"
        className="toc-alert-link"
        title={`Subscribe to alerts for the publication "${buttonData.journal}"`}
        href={buttonData.url}
        target="_blank"
        rel="noreferrer"
      >
        { buttonData.text }
      </a>
    </root.div>
  );
};

export default TocAlertShadow;
