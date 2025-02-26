import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
}

const GeneralIcon = ({ classes = [] }: Props) => {
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
      <path d="m0 0h32v2.49h-32z" />
      <path d="m0 29.51h32v2.49h-32z" />
      <path d="m0 14.73h21.59v2.49h-21.59z" />
    </svg>
  );
};

export default GeneralIcon;
