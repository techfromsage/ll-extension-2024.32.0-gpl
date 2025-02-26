import React from 'react';
import Button from '@/subComponents/Buttons/Button';
import CheckedBookmark from '@/icons/CheckedBookmark';
import bootstrap from '@bootstrap/index';
import browserMethods from '@/browserMethods';
import Card from '@/subComponents/Card/Card';

interface ISearchPageSavedCitation {
  text: string,
  projectId: string,
  articleId: string,
}

const SearchPageSavedCitation = ({ text, projectId, articleId }: ISearchPageSavedCitation) => {
  const openSciwheelDashboard = () => {
    browserMethods.tabs.contentScript.create(
      `${bootstrap.api.sciwheel.base}/work/#/items/${articleId}/detail?collection=${projectId}`,
    );
  };
  return (
    <div className="search-page-saved-citation__wrapper">
      <Card className="card--bordered card--small-shadow card--no-margin">
        <div className="search-page-saved-citation">
          <span>
            <CheckedBookmark />
          </span>
          <span className="search-page-saved-citation__text">{text}</span>
        </div>
        <div className="search-page-saved-citation__link">
          <Button
            className="button-inline button-as-link-secondary"
            onClick={openSciwheelDashboard}
            text="View in workspace"
            buttonType="newtab"
          />
        </div>
      </Card>
    </div>
  );
};

export default SearchPageSavedCitation;
