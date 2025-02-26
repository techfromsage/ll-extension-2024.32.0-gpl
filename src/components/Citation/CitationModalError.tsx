import React, { useContext } from 'react';
import browserMethods from '@/browserMethods';
import Button from '@/subComponents/Buttons/Button';
import CitationEvent from '@/enums/stateMachine/CitationEvent';
import CitationReactContext from '@/components/Context/CitationReactContext';
import wentWrong from '@/assets/img/wentWrong.png';

const CitationModalError = () => {
  const { sendCitationState } = useContext(CitationReactContext);

  const handleClick = () => {
    sendCitationState(CitationEvent.ResetCitation);
  };

  return (
    <div className="citation__error" data-testid="citation-error">
      <img src={browserMethods.runtime.getURL(wentWrong)} alt="Error alert" />
      <p>Something went wrong... We have logged the error and will resolve it as soon as possible.</p>
      <Button
        className="button-neutral button--half-width button--no-margin"
        text="Try again"
        onClick={handleClick}
        data-testid="Button-Try again"
        buttonType="retry"
      />
    </div>
  );
};

export default CitationModalError;
