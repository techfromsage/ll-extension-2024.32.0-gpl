import React, { useEffect } from 'react';
import { LibrarySearchTypeState } from '@/modules/shared/stateMachine/StateMachineLibrarySearch';
import LoginMessage from '@/components/LibrarySearch/LoginMessage';
import LibrarySearchResults from '@/components/LibrarySearch/LibrarySearchResults';
import Button from '@/subComponents/Buttons/Button';
import LibrarySearchState from '@/enums/stateMachine/LibrarySearchState';
import Loading from '@/components/App/Loading';
import browserMethods from '@/browserMethods';
import FuturesStatType from '@/enums/FuturesStatType';

interface Props {
  values: LibrarySearchTypeState,
  refreshQuery: () => void,
}

/**
 * @param {LibrarySearchContext} context
 * @param {LibrarySearchState} status
 * @param {() => void} refreshQuery
 * @returns {JSX.Element}
 * @constructor
 */
const LibrarySearchContent = ({ values: { context, value: status }, refreshQuery }: Props): JSX.Element => {
  const {
    knowledgeBase, searchResults,
  } = context;

  if (status === LibrarySearchState.Fetching) {
    return <Loading />;
  }

  if (status === LibrarySearchState.Failed) {
    return (
      <div className="search-result__message">
        <p>Something went wrong. Please try again. If the problem persists, please reach out to your library.</p>
        <p>
          <Button className="button-primary" onClick={refreshQuery} text="Try again" />
        </p>
      </div>
    );
  }

  if (status === LibrarySearchState.LoginNeeded) {
    return <LoginMessage refreshQuery={refreshQuery} knowledgeBase={knowledgeBase} />;
  }

  const hasResults = searchResults.some(({ items }) => items?.length);

  // Update on searchResults change prevents events fired on every render
  useEffect(() => {
    if (hasResults) {
      browserMethods.app.statEventFutures({
        type: FuturesStatType.LibrarySearchShown,
        module_uuid: context.knowledgeBase.uuid,
        institute_id: context.knowledgeBase.institution,
      });
    }
  }, [searchResults]);

  const sendResultClickedEvent = () => {
    browserMethods.app.statEventFutures({
      type: FuturesStatType.LibrarySearchClicked,
      module_uuid: context.knowledgeBase.uuid,
      institute_id: context.knowledgeBase.institution,
    });
  };

  return hasResults
    ? (
      <>
        {
          searchResults.map(
            ({ category, items, viewMoreUrl }, index) =>
              (
                <LibrarySearchResults
                  key={index}
                  results={items}
                  viewMoreUrl={viewMoreUrl}
                  isOdd={!!(index % 2)}
                  onClickHandler={sendResultClickedEvent}
                />
              ),
          )
        }
      </>
    )
    : (<p>No results were found here for your search.</p>);
};

export default LibrarySearchContent;
