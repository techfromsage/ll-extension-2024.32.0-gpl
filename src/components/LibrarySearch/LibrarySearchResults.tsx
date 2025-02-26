import React from 'react';
import { SearchResult } from '@/interfaces/librarySearches/SearchResults';

interface Props {
  results: SearchResult[],
  viewMoreUrl?: string,
  isOdd: boolean,
  onClickHandler: () => void,
}

const LibrarySearchResults = ({
  results, viewMoreUrl, isOdd, onClickHandler,
}: Props) => {
  return (
    <>
      {isOdd && <hr className="search-results__divider" />}
      <div className="search-results">
        <ul className="search-results__items">
          {
            results.map((result, index) => (
              <li className="search-result" key={index}>
                <a
                  href={result.href}
                  target="_blank"
                  className="search-result__title"
                  rel="noreferrer"
                  onClick={() => onClickHandler()}
                >
                  {result.title}
                </a>
                {result.metadata && (
                <span className="search-result__metadata">
                  {result.metadata}
                  {' '}
                </span>
                )}
                <span className="search-result__excerpt">
                  {result.text}
                  {
                    result.text
                    && (
                    <span>
&nbsp;
                      <a href={result.href} target="_blank" className="link" rel="noreferrer">Read more</a>
                    </span>
                    )
                  }
                </span>
              </li>
            ))
          }
        </ul>
        {viewMoreUrl
          && <a href={viewMoreUrl} target="_blank" className="link" rel="noreferrer">Show more results &gt;</a>}
      </div>
    </>
  );
};

export default LibrarySearchResults;
