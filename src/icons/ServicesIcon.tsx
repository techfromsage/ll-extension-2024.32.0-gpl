import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
}

const ServicesIcon = ({ classes = [] }: Props) => {
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
      <path d="M30,5.6c0-2,.09-3.63-.9-4.65S27.25,0,25.36,0H7.21A5.44,5.44,0,0,0,3.09,1.5,4,4,0,0,0,2,4.33V26.21A5.54,5.54,0,0,0,3.59,30.4,6.41,6.41,0,0,0,7.79,32H25.86a3.93,3.93,0,0,0,2.9-1.14A4.94,4.94,0,0,0,30,27.47V7.14C30,6.59,30,6.08,30,5.6ZM4.94,3.17A3.19,3.19,0,0,1,7.21,2.5H25.39c1.6,0,1.76,0,1.91.17s.23,1.78.2,2.88c0,.5,0,1,0,1.6V21.36H7.17a4.76,4.76,0,0,0-2.69.93v-18A1.63,1.63,0,0,1,4.94,3.17Zm22,26a1.47,1.47,0,0,1-1.08.37h-18a3.86,3.86,0,0,1-2.48-.92,2.47,2.47,0,0,1-.86-2.1v-.77c0-1.59,2.44-1.93,2.69-1.93H27.48v3.69A2.56,2.56,0,0,1,26.94,29.18Z" />
    </svg>
  );
};

export default ServicesIcon;
