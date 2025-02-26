import React from 'react';
import { render } from 'react-dom';
import ShadowList from '@/enums/ShadowList';
import { SciteTalliesItem } from '@/interfaces/scite/SciteTalliesResponse';
import { SciteNotices } from '@/interfaces/scite/SciteNotices';
import Scite from './Scite';

interface Props {
  tally: SciteTalliesItem,
  notices: SciteNotices,
  layout: 'vertical' | 'horizontal',
  clickHandler: () => void,
  key: string,
  element: Element,
  showZero: boolean,
  enabled: boolean,
}

/**
 * Creates, renders and appends the Scite badge.
 */
export default ({
  tally, notices, clickHandler, key, layout, element, showZero, enabled,
}: Props) => {
  const newDiv = document.createElement('div');
  newDiv.id = `${ShadowList.Scite}${key}`;
  element.appendChild(newDiv);

  render(
    <Scite
      tally={tally}
      notices={notices}
      layout={layout}
      showZero={showZero}
      clickHandler={clickHandler}
      enabled={enabled}
    />,
    newDiv,
  );
};
