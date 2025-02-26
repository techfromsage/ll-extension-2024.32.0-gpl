import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import Logo from '@/subComponents/Logo/Logo';
import ComponentType from '@/enums/ui/ComponentType';
import DoubleQuotesIcon from '@/icons/DoubleQuotesIcon';
import InstituteLogo from '@/modules/shared/InstituteLogo';
import Button from '@/subComponents/Buttons/Button';
import Label from '@/subComponents/Label/Label';
import AsyncSelect from '@/subComponents/Select/AsyncSelect';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import CitationEvent from '@/enums/stateMachine/CitationEvent';
import CitationStyle from '@/interfaces/citation/CitationStyle';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import CitationReactContext from '@/components/Context/CitationReactContext';
import Alert from '@/subComponents/Alert/Alert';
import CheckCircleIcon from '@/icons/CheckCircleIcon';
import browserMethods from '@/browserMethods';
import FuturesStatType from '@/enums/FuturesStatType';
import WarningTriangleIcon from '@/icons/WarningTriangleIcon';
import * as clipboard from 'clipboard-polyfill';

interface CitationStyleOption {
  value: number,
  label: string,
  title: string,
  group: string,
  isRecent: boolean,
}

const formatCitationStyles = (styles: CitationStyle[], recent: number) =>
  styles.map(style => ({
    value: style.id,
    label: style.short_title || style.title,
    title: style.title,
    group: style.favorite ? 'Popular styles' : 'More styles',
    isRecent: style.id === recent,
  }));
interface Props {
  notifications: NotificationUI[],
}

const CitationModalBody = ({ notifications }: Props) => {
  const { storeState: { institutes, citation: { styles } } } = useContext(AppActiveReactContext);
  const { citationData, sendCitationState } = useContext(CitationReactContext);
  const [copying, setCopying] = useState(false);

  const instituteForStylesAndStats = institutes.findIndex(institute => institute.modules_enabled.citations !== false);
  const digitalResource = notifications.find(notification => notification.metadata?.digitalResource)?.metadata?.digitalResource;

  const onChange = (option: CitationStyleOption): void => {
    sendCitationState(CitationEvent.GetFormattedCitation, {
      styleId: option.value,
      digitalResource,
    });

    browserMethods.app.statEventFutures({
      type: FuturesStatType.CitationsClick,
      institute_id: institutes[instituteForStylesAndStats].id,
      domain: window.location.hostname,
    });
  };

  useEffect(() => {
    if (citationData.styleId) {
      onChange({ value: citationData.styleId } as CitationStyleOption);
    }
  }, []);

  const sortedCitationStyles = styles[instituteForStylesAndStats]
    .sort((a, b) => (b.favorite - a.favorite));
  const formattedCitationStyles = useMemo(() =>
    formatCitationStyles(sortedCitationStyles, citationData.styleId), [styles, citationData.styleId]);

  const hasClipboard = 'clipboard' in navigator;
  const handleCopyCitationClick = () => {
    setCopying(true);
    if (hasClipboard && !copying) {
      const tempDivElement = document.createElement('div');
      tempDivElement.innerHTML = citationData.citation;
      const citationPlainText = tempDivElement.textContent || tempDivElement.innerText;

      const item = new clipboard.ClipboardItem({
        'text/html': new Blob([citationData.citation], { type: 'text/html' }),
        'text/plain': new Blob([citationPlainText], { type: 'text/plain' }),
      });
      clipboard.write([item]).then(() => {
        setTimeout(() => setCopying(false), 1200);
      });
      browserMethods.app.statEventFutures({
        type: FuturesStatType.CitationsCopy,
        institute_id: institutes[instituteForStylesAndStats].id,
      });
    }
  };

  const commaSeparatedMissingVariables = citationData.missingVariables
    ?.map(variable => variable.charAt(0).toUpperCase() + variable.slice(1).replace(/[-_]/g, ' '))
    .join(', ') || '';

  return (
    <>
      <Logo
        src={InstituteLogo(notifications[0]?.institution || institutes[0])}
        type="citation-modal"
        alt="Institution Logo"
      />
      <div className="citation__title">
        <DoubleQuotesIcon />
        <span className="citation__title__text">Get Citation</span>
        <Label text="New" type={ComponentType.NewFeature} />
      </div>
      <div>
        <div className="citation__style">
          <AsyncSelect
            name="Citation style"
            options={formattedCitationStyles}
            onChange={onChange}
            value={formattedCitationStyles.find(style => style.value === citationData.styleId) || 0}
            placeholder="Select style..."
            width="100%"
            isCitation
          />
          {citationData.citation && (
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: citationData.citation }}
              className="citation__style__preview"
              data-testid="citation-preview"
            />
          )}
          {copying && (
            <Alert
              type={ComponentType.Success}
              message="Citation copied!"
              icon={<CheckCircleIcon fill="#2F7037" />}
            />
          )}
          <div
            role="status"
            aria-live="polite"
            className="screen-reader-only"
          >
            {copying && 'Citation copied!'}
          </div>
        </div>
        {commaSeparatedMissingVariables && (
          <Alert
            type={ComponentType.Warning}
            message={(
              <span data-testid="citation-warning">
                <strong><em>{commaSeparatedMissingVariables}</em></strong>
                {' '}
                might be missing, please double check before using this citation.
              </span>
            )}
            icon={<WarningTriangleIcon />}
            className="alert--text-left"
          />
        )}
      </div>
      {hasClipboard && (
        <div className="citation__cta">
          <Button
            className="button-primary button--half-width button--no-margin"
            text="Copy citation"
            onClick={handleCopyCitationClick}
            data-testid="Button-Copy citation"
          />
        </div>
      )}
    </>
  );
};

export default CitationModalBody;
