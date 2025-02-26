import React, { MouseEvent, useState } from 'react';
import Checkbox from '@/subComponents/Checkbox/Checkbox';

interface Props {
  name?: string,
  text?: string,
  className?: string,
  defaultChecked?: boolean,
  onClick?: (event: MouseEvent) => void,
}

/**
 * A hiding checkbox is a regular checkbox that disappears after it has been checked/unchecked.
 *
 * This is useful for one-time actions such as the "Do not show again" checkbox that is a one-time thing.
 *
 * @param {((event: React.MouseEvent) => void) | undefined} onClick
 * @param {Pick<Props, "name" | "text" | "className" | "defaultChecked">} rest
 * @returns {JSX.Element}
 * @constructor
 */
const HidingCheckbox = ({
  name, text, className, defaultChecked, onClick,
}: Props) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleClick = (event: MouseEvent) => {
    if (onClick) {
      onClick(event);
    }
    setChecked(true);
  };

  const classes = [
    'hiding-checkbox',
    checked && 'hiding-checkbox--hidden',
  ].filter(Boolean);

  return (
    <div className={classes.join(' ')} aria-hidden={checked}>
      <Checkbox
        name={name}
        text={text}
        className={className}
        defaultChecked={defaultChecked}
        onClick={handleClick}
      />
    </div>
  );
};

export default HidingCheckbox;
