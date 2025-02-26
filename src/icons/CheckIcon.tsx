import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
}

const CheckIcon = ({ classes = [] }: Props) => {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M 11.984 16.703 L 26.114 2.331 L 31.779 8.185 L 11.974 28.653 L 0.192 16.476 L 5.778 10.286 L 11.984 16.703 Z" />
    </svg>
  );
};

export default CheckIcon;
