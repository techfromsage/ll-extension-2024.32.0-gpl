import root from 'react-shadow';
import React from 'react';
import { useSelector } from '@xstate/react';
import { SciteTalliesItem } from '@/interfaces/scite/SciteTalliesResponse';
import { SciteNotices } from '@/interfaces/scite/SciteNotices';
import PrepareCounts from '@/modules/scite/PrepareCounts';
import { selectLayout, selectStore } from '../Shadow/selectors';
import './Scite.scss';

interface Props {
  tally: SciteTalliesItem,
  notices: SciteNotices,
  layout: 'horizontal' | 'vertical',
  showZero: boolean,
  clickHandler: () => void,
  enabled: boolean,
}

const Scite = ({
  tally, notices, layout, showZero, clickHandler, enabled,
}: Props) => {
  if (!enabled || !tally?.doi) {
    return <></>;
  }

  const items = PrepareCounts(tally, notices);

  const sciteBadge = items.map(([metricName, value], index) => (
    <span
      className={['ll-scite-metric', `ll-scite-metric--${layout}`, index === 0 ? 'first' : ''].join(' ')}
      key={metricName}
    >
      <span className="ll-scite-metric__container">
        <i className={['ll-scite-metric__icon', `ll-scite-metric__icon--${metricName}`].join(' ')} />
        <span className="ll-scite-metric__value">{value}</span>
      </span>
    </span>
  ));

  const sciteBadgeHover = items.map(([metricName, value], index) => (
    <span
      className={[
        'll-scite-metric-tooltip',
        `ll-scite-metric-tooltip--${layout}`,
        index === 0 ? 'first' : '',
      ].join(' ')}
      key={metricName}
    >
      <span className="ll-scite-metric__container-tooltip">
        <i className={['ll-scite-metric__icon', `ll-scite-metric__icon--${metricName}`].join(' ')} />
        <span className="ll-scite-metric__value-tooltip">
          {value}
        </span>
        <span className="ll-scite-metric__name-tooltip">
          {metricName === 'citingPublications' ? 'Citing Publications'
            : metricName.charAt(0).toUpperCase() + metricName.slice(1)}
        </span>
      </span>
    </span>
  ));

  const { screenSize } = useSelector(window.stateInterpreterLayout, selectLayout);
  const { appSettings: { customTextSize } } = useSelector(window.stateInterpreterAppActive, selectStore);

  return (
    <>
      <root.div>
        <link rel="stylesheet" type="text/css" href={chrome.runtime.getURL('contentScript.css')} />
        <div className={screenSize}>
          <div className={customTextSize}>
            <div className={`ll-scite-container ll-scite-container--${layout}`} style={{ visibility: 'hidden' }}>
              {/* Badge */}
              <a
                className={`ll-scite-badge ll-scite-badge--${layout}`}
                onClick={clickHandler}
                href={`https://scite.ai/reports/${tally.doi}`}
                target="_blank"
                data-testid="Scite"
                data-doi={tally}
                data-layout={layout}
                data-tooltip-placement="right"
                data-show-zero={showZero}
                rel="noreferrer"
              >
                {layout === 'vertical'
              && <img className="ll-scite-badge--logo" alt="Scite" src="https://cdn.scite.ai/assets/images/logo.svg" />}
                {sciteBadge}
              </a>

              <div className={`ll-scite-content ll-scite-content--${layout}`}>
                {/* Tooltip */}
                <div className={`ll-scite-tooltip ll-scite-tooltip--${layout}`}>
                  <img className="ll-scite-tooltip--logo" alt="Scite" src="https://cdn.scite.ai/assets/images/logo.svg" />
                  <p className="ll-scite-tooltip--head">Smart Citations</p>
                  {sciteBadgeHover}
                  <a
                    className="ll-scite-tooltip--button"
                    href={`https://scite.ai/reports/${tally.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Citations
                  </a>
                  <p className="ll-scite-tooltip--title">
                    See how this article has been cited at
                    {' '}
                    <a href="https://scite.ai" target="_blank" rel="noreferrer">scite.ai</a>
                  </p>
                  <p className="ll-scite-tooltip--description">
                    scite shows how a scientific paper has been cited by providing the context of the citation,
                    a classification describing whether it supports, mentions, or contrasts the cited claim,
                    and a label indicating in which section the citation was made.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </root.div>

      <link rel="stylesheet" type="text/css" href={chrome.runtime.getURL('sciteFont.css')} />
    </>
  );
};

export default Scite;
