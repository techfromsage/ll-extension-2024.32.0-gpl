import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
}

const MinimiseIcon = ({ classes = [] }: Props) => {
  const percent = CalculateIconSize(-1);
  return (
    <svg
      className={classes.join(' ')}
      width={`${percent}`}
      height={`${percent}`}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m21.81 20.99h-.87v11.01h4.5v-6.52h6.56v-4.5h-10.19z" />
      <path d="m10.99 20.93h-10.99v4.5h6.51v6.57h4.49v-10.21h-.01z" />
      <path d="m6.56 6.52h-6.56v4.5h10.19l.86-.01v-11.01h-4.49z" />
      <path d="m20.96 11.07h10.99v-4.5h-6.5v-6.57h-4.5v10.21h.01z" />
    </svg>
  );
};

export default MinimiseIcon;
