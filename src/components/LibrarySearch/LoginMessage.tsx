import React from 'react';
import KnowledgeBase from '@/interfaces/librarySearches/KnowledgeBase';
import Button from '@/subComponents/Buttons/Button';

interface Props {
  knowledgeBase: KnowledgeBase,
  refreshQuery: () => void,
}

const LoginMessage = ({ knowledgeBase, refreshQuery }: Props) => {
  return (
    <div className="search-result__message">
      <p>
        We had trouble retrieving data from&nbsp;
        <a href={knowledgeBase.sourceUrl} rel="noopener noreferrer" target="_blank">
          {`${knowledgeBase.name}`}
        </a>
        .
      </p>
      <p>
        Please check if you are logged in and have the right
        permissions to access this knowledge base.
      </p>
      <p>
        <Button className="button-primary" onClick={refreshQuery} text="Try again" />
      </p>
    </div>
  );
};

export default LoginMessage;
