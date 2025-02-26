/**
 * MutationObserver
 * Single Page Apps (React, Vue, etc) that pull and render content in JS render too late and the page has
 * already been scraped.
 * This MutationObserver will re-initialise the app if a new node
 *
 * see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 */

import ScraperType from '@/enums/ScraperType';
import ShadowList from '@/enums/ShadowList';
import AppActiveEvent from '@/enums/stateMachine/AppActiveEvent';
import ReferenceManagerEvent from '@/enums/stateMachine/ReferenceManagerEvent';
import { DoiScraperConfig } from '@/interfaces/Config';
import DigitalResources from '@/modules/alternatives/DigitalResources';
import { store } from '@/store';
import differenceBy from 'lodash.differenceby';
import handleReferenceManagerGoogleScholar from './handleReferenceManagerGoogleScholar';

let reinitialiseTimeout: NodeJS.Timeout | undefined;

/**
 *  Reinitialise the extension
 */
const reinitialise = () => {
  clearTimeout(reinitialiseTimeout);
  reinitialiseTimeout = setTimeout(() => {
    window.stateInterpreterAppActive.send(AppActiveEvent.RedeterminePage);
    window.stateInterpreterReferenceManager.send(ReferenceManagerEvent.DetermineResources);
  }, 1000);
};

/**
 * Create a HTML Document from the detected changes
 * @param nodeText: string
 * @returns Document
 */
const nodeDocument = (nodeText: string): Document => {
  const doc = document.implementation.createHTMLDocument();
  doc.body.innerHTML = nodeText;
  return doc;
};

/**
 * Filter out irrelevant mutations
 * @param mutation: MutationRecord
 * @returns boolean
 */
const filterOutIrrelevantMutations = (mutation: MutationRecord) => {
  if (['HEAD', 'HTML', 'BODY', 'STYLE', 'SCRIPT', 'LINK'].includes(mutation.target.nodeName)) {
    return false;
  }

  if (!('id' in mutation.target) || !mutation.target.id) {
    return true;
  }

  const id = mutation.target.id as string;
  if (id === ShadowList.Wrapper) {
    return false;
  }

  // Filter out anything that starts with the LL prefix
  return !id.startsWith('LL');
};

const containsNewDigitalResource = (
  nodeText: string,
  ebookEnabled: boolean,
  doiScraperConfig: DoiScraperConfig[],
  currentUrl: URL,
) => {
  // We don't want to reinitialise if the node does NOT contain a DOI or ISBN
  const digitalResources = DigitalResources(
    nodeDocument(nodeText),
    currentUrl,
    ebookEnabled,
    doiScraperConfig,
  ).find();

  if (digitalResources.length === 0) {
    return false;
  }

  const previousDigitalResources = window.stateInterpreterAppActive.getSnapshot().context.digitalResourceIds;
  const digitalResourceIds = digitalResources.map(resource => resource.identifier);
  // Only reinitialise if we detect a new digital resource, checking on unique identifiers
  const newDigitalResources = differenceBy(digitalResourceIds, previousDigitalResources);
  if (newDigitalResources.length === 0) {
    return false;
  }

  // We don't want to reinitialise if we only detect a path scraper
  // We capture URL changes in the URL watcher
  return !(digitalResources.length === 1 && digitalResources[0].scraperType === ScraperType.Path);
};

/**
 * Detect if the extension need to reinitialise based on SPA changes
 * @param ebookEnabled: boolean
 * @param doiScraperConfig: DoiScraperConfig[]
 */
const detectReinitialisation = (
  ebookEnabled: boolean,
  doiScraperConfig: DoiScraperConfig[],
  currentUrl: URL,
) =>
  (mutation: MutationRecord): boolean => {
    const nodeList = (mutation.type === 'childList'
      ? Array.from(mutation.addedNodes)
      : [mutation.target]) as Element[];

    if (nodeList.length === 0) {
      return false;
    }

    const shadowList = Object.values(ShadowList) as string[];
    // We don't want to reinitialise if we mutated the dom ourselves
    const nodeText = nodeList
      .filter(node => !shadowList.includes(node.id))
      .map(node => node.outerHTML).join(' | ');

    return nodeText
      ? containsNewDigitalResource(nodeText, ebookEnabled, doiScraperConfig, currentUrl)
      : false;
  };

/**
 * Start the observer
 * @param observer: MutationObserver
 * @param target: Node
 */
const StartObserver = (observer: MutationObserver, target: Node) => {
  observer.observe(target, {
    childList: true, subtree: true, attributes: true,
  });
};

/**
 * Watch if URL changes and reinitialise the observer if needed (SPA router system)
 * @param observer: MutationObserver
 * @param target: Node
 */
const UrlWatcher = (observer: MutationObserver, target: Node) => {
  let oldLocation = 'initial';
  setInterval(() => {
    const newLocation = window.location.href;
    if (oldLocation !== 'initial' && newLocation !== oldLocation) {
      if (window.location.host.includes('scholar.google')) {
        handleReferenceManagerGoogleScholar();
      } else {
        reinitialise();
        StartObserver(observer, target);
      }
    }
    oldLocation = newLocation;
  }, 300);
};

export default () => {
  const { config, appSettings } = store.getState();
  const ebookEnabled = appSettings.alternatives.ebook;
  const doiScraperConfig = config?.doiScraper || [];

  const target = document.querySelector('html') as Node;
  const currentUrl = new URL(window.location.href);

  const observer = new MutationObserver(mutations => {
    const needsReinitialising = mutations
      .filter(filterOutIrrelevantMutations)
      .some(detectReinitialisation(ebookEnabled, doiScraperConfig, currentUrl));

    if (needsReinitialising) {
      reinitialise();
    }
  });

  StartObserver(observer, target);
  UrlWatcher(observer, target);
};
