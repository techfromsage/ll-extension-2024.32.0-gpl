import React, { useContext } from 'react';
import Button from '@/subComponents/Buttons/Button';
import browserMethods from '@/browserMethods';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import { SearchEngine } from '@/interfaces/Institution';

const search = (searchEngine: SearchEngine) => {
  const searchUrl = new URL(window.location.href);
  const searchQuery = searchUrl.searchParams.get('q') || '';
  const url = searchEngine.url.replace(/{search-term}/g, encodeURIComponent(searchQuery));
  browserMethods.app.contentScript.openNewTab(url);
};

/**
 * @returns {JSX.Element}
 * @constructor
 */
const ReferenceManagerNotSupported = () => {
  const { storeState: { institutes } } = useContext(AppActiveReactContext);
  const searchEngine = institutes[0]?.searchEngines[0];

  return (
    <div className="reference-manager--not-supported">
      <div className="heading">Sciwheel not supported</div>
      <div className="body">
        <p>Sciwheel is not supported on this page.</p>
        <p>
          Follow a link on the page to annotate or save references to Sciwheel.
          Alternatively, continue your search by clicking one of the options below:
        </p>
      </div>
      <div className="reference-manager--not-supported__actions">
        {
          searchEngine
          && (
            <Button
              className="button-primary"
              onClick={() => search(searchEngine)}
              text="Search library holdings"
            />
          )
        }
        <Button
          className="button-secondary"
          onClick={() => window.location.assign('https://scholar.google.co.uk/')}
          text="Search on Google Scholar"
        />
        <Button
          className="button-secondary"
          onClick={() => window.location.assign('https://pubmed.ncbi.nlm.nih.gov/')}
          text="Search on PubMed"
        />
      </div>
    </div>
  );
};

export default ReferenceManagerNotSupported;
