import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import ReferenceManagerEvent from '@/enums/stateMachine/ReferenceManagerEvent';
import ReferenceManagerState from '@/enums/stateMachine/ReferenceManagerState';
import HashParser from '@/modules/shared/scrape/googleScholar/HashParser';
import ScrapeGoogleScholar from '@/modules/shared/scrape/ScrapeGoogleScholar';

/**
 * Handles embedding cite link on Google Scholar
 */
export default () => {
  const referenceManager = window.stateInterpreterReferenceManager.getSnapshot();
  const { digitalResources } = referenceManager.context.resources;
  const referenceManagerSupported = referenceManager.value === ReferenceManagerState.Off;
  if (referenceManagerSupported) {
    return;
  }

  const citeWindowId = HashParser(window.location);
  if (!citeWindowId) {
    return;
  }

  const element = (document.querySelector('a.gs_citi') || {}).parentNode;
  const newLink = document.createElement('a');

  const onClick = () => async () => {
    const scrapedArticles = ScrapeGoogleScholar(document);
    const scrapedArticle = scrapedArticles.findIndex(({ citeId }) => citeId === citeWindowId);
    const digitalResource = digitalResources[scrapedArticle];

    await window.stateInterpreterReferenceManager.send(
      ReferenceManagerEvent.CiteGoogleScholar,
      { referenceResource: digitalResource },
    );

    window.stateInterpreterLayout.send(LayoutEvent.ReferenceManager);
    window.stateInterpreterLayout.send(LayoutEvent.Open);
  };

  // eslint-disable-next-line no-script-url
  newLink.href = 'javascript:void(0)';
  newLink.className = 'gs_citi';
  newLink.textContent = 'Sciwheel';
  newLink.onclick = onClick();

  if (element) {
    element.appendChild(newLink);
  }
};
