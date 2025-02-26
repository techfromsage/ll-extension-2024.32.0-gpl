import React, { MouseEvent, useEffect, useState } from 'react';

interface Props {
  name?: string,
  text?: string,
  className?: string,
  defaultChecked?: boolean,
  onClick?: (event: MouseEvent) => void,
  handleSelectAll?: boolean,
}

const Checkbox = ({
  name,
  text,
  className,
  onClick,
  defaultChecked = false,
  handleSelectAll,
}: Props) => {
  const [checked, setChecked] = useState<boolean>(defaultChecked);
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

  return (
    <label className="checkbox__wrapper" htmlFor={name}>
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
        <span className="checkbox__box" />
      </div>
      {(text) && (
        <span className="checkbox__text">{text}</span>
      )}
    </label>
  );
};

export default Checkbox;
