import React from 'react';
import CalculateIconSize from '@/icons/CalculateIconSize';

interface Props {
  sizeModifier: number,
  classes?: string[],
}

const CloseIcon = ({ classes = [], sizeModifier }: Props) => {
  const percent = CalculateIconSize(sizeModifier);
  return (
    <svg
      className={classes.join(' ')}
      width={`${percent}`}
      height={`${percent}`}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* eslint-disable max-len */}
      <path d="m28.84.1-12.84 12.82-12.85-12.82-3.15 3.19 12.82 12.8-12.82 12.81 3.15 3.19 12.85-12.82 12.84 12.82 3.16-3.19-12.82-12.81 12.82-12.8z" />
    </svg>
  );
};

export default CloseIcon;
