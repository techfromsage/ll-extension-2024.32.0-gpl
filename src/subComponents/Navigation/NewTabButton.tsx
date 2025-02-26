import React from 'react';
import Button from '../Buttons/Button';

interface Props {
  hasNewtab?: boolean,
  onNewtab?: () => void,
  isDisabled: boolean,
}

const NewTabButton = ({ hasNewtab, onNewtab, isDisabled }: Props) => {
  if (hasNewtab && onNewtab) {
    return (
      <li className="navigation__item">
        <Button
          className="newtab"
          hiddenText
          disabled={isDisabled}
          onClick={() => onNewtab()}
          text="Open in new tab"
        />
      </li>
    );
  }

  return <></>;
};

export default NewTabButton;
