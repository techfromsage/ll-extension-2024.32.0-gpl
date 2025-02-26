import React, { MouseEvent, useEffect, useState } from 'react';
import UncheckedBookmark from '@/icons/UncheckedBookmark';
import CheckedBookmark from '@/icons/CheckedBookmark';

interface Props {
  name?: string,
  text?: string,
  className?: string,
  defaultChecked?: boolean,
  onClick?: (event: MouseEvent) => void,
  handleSelectAll?: boolean,
}

const BookmarkCheckbox = ({
  name,
  text,
  className,
  onClick,
  defaultChecked = false,
  handleSelectAll,
}: Props) => {
  const [checked, setChecked] = useState(defaultChecked);
  const classes = [
    'checkbox',
    className,
  ].filter(Boolean);

  const handleClick = (event: MouseEvent) => {
    setChecked(!checked);
    if (onClick) {
      onClick(event);
    }
  };

  useEffect(() => {
    setChecked(!!handleSelectAll);
  }, [handleSelectAll]);

  useEffect(() => {
    setChecked(checked);
  }, []);

  return (
    <label className="bookmark__checkbox" htmlFor={name}>
      <div className={classes.join(' ')}>
        <input
          type="checkbox"
          checked={checked}
          readOnly
          name={name}
          onClick={handleClick}
          id={name}
          data-testid={`Checkbox-${name}`}
        />
        <span className="icon">
          {checked ? (
            <CheckedBookmark />
          ) : (
            <UncheckedBookmark />
          )}
        </span>
      </div>
      {(text) && (
        <span className="checkbox__text">{text}</span>
      )}
    </label>
  );
};

export default BookmarkCheckbox;
