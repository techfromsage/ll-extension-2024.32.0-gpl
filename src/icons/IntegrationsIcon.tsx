import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
}

const IntegrationsIcon = ({ classes = [] }: Props) => {
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
      <path d="m26.19 20.86-1.72-1.73 2.66-2.66a8.21 8.21 0 0 0 -5.74-14 8.14 8.14 0 0 0 -5.78 2.38l-2.74 2.69-1.73-1.73 2.67-2.66a10.6 10.6 0 0 1 7.55-3.15 10.64 10.64 0 0 1 7.45 18.2z" />
      <path d="m10.64 32a10.64 10.64 0 0 1 -7.49-18.2l2.66-2.66 1.73 1.73-2.67 2.66a8.21 8.21 0 0 0 5.74 14 8.1 8.1 0 0 0 5.77-2.38l2.72-2.72 1.73 1.73-2.67 2.66a10.6 10.6 0 0 1 -7.52 3.18z" />
      <path d="m7.29 14.82h17.37v2.44h-17.37z" transform="matrix(.70710678 -.70710678 .70710678 .70710678 -6.66 15.99)" />
    </svg>
  );
};

export default IntegrationsIcon;
