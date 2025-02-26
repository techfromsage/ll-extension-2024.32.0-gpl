import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
}

const HomeIcon = ({ classes = [] }: Props) => {
  const percent = CalculateIconSize();
  return (
    <svg
      className={classes.join(' ')}
      width={`${percent}`}
      height={`${percent}`}
      fill="#262626"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* eslint-disable max-len */}
      <path d="M31.09,12.69h0v-.95l-4-3L16.1,0,15,.93,6.81,7.28.9,11.74V32H31.09V12.69Zm-3.35,16H4.26V13.51L16,4.38l11.74,9.13Z" />
    </svg>
  );
};

export default HomeIcon;
