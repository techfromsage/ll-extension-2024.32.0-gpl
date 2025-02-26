import React from 'react';
import { render } from 'react-dom';
import TocAlertShadow from '@/components/TocAlerts/TocAlertShadow';
import TocAlertButtonData from '@/interfaces/tocAlerts/TocAlertButtonData';
import ShadowList from '@/enums/ShadowList';

/**
 * Fetches or creates a link container for the buttons.
 *
 * If the full text PDF link is not present on a search result then
 * the link container (<div class="gs_fl gs_ggs">...</div> ) is not present.
 *
 * If this is the case we create our own one for that search result.
 *
 * @param {Element} element
 * @returns {Element}
 */
const linkContainer = (element: Element): Element => {
  const container = element.querySelector('.gs_fl.gs_ggs');
  if (container) {
    return container;
  }
  const newContainer = document.createElement('div');
  newContainer.setAttribute('class', 'gs_fl gs_ggs');
  element.prepend(newContainer);
  return newContainer;
};

/**
 * Renders the toc alert button into the shadow DOM.
 * @param {TocAlertButtonData} buttonData
 * @param {Element} element
 */
export default (buttonData: TocAlertButtonData, element: Element) => {
  const newDiv = document.createElement('div');
  newDiv.id = `${ShadowList.Toc}${buttonData.position}`;
  newDiv.setAttribute('class', 'toc-alert-wrapper');
  document.getElementById(newDiv.id)?.remove();
  linkContainer(element).appendChild(newDiv);
  render(<TocAlertShadow buttonData={buttonData} />, newDiv);
};
