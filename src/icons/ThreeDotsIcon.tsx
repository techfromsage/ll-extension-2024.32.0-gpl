import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
}

const ThreeDotsIcon = ({ classes = [] }: Props) => {
  const percent = CalculateIconSize(-2.25);

  return (
    <svg
      className={classes.join(' ')}
      width={`${percent}`}
      height={`${percent}`}
      viewBox="0 0 2 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 0C0.45 0 0 0.45 0 1C0 1.55 0.45 2 1 2C1.55 2 2 1.55 2 1C2 0.45 1.55 0 1
        0ZM1 10C0.45 10 0 10.45 0 11C0 11.55 0.45 12 1 12C1.55 12 2 11.55 2 11C2 10.45
        1.55 10 1 10ZM1 5C0.45 5 0 5.45 0 6C0 6.55 0.45 7 1 7C1.55 7 2 6.55 2 6C2 5.45
        1.55 5 1 5Z"
        fill="#474747"
      />
    </svg>
  );
};

export default ThreeDotsIcon;
