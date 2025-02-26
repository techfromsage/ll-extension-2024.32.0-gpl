import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
}

const ToolsIcon = ({ classes = [] }: Props) => {
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
      <path d="M4.3.37a6.47,6.47,0,0,1,8.28,4,7.24,7.24,0,0,1-.68,5.56L31.73,29.81l-2.06,2.07L9.85,12C6.7,13.66,2.48,12.76.78,9.59A6.55,6.55,0,0,1,.37,4.32L4.51,8.48a2.77,2.77,0,0,0,3.93.07,2.81,2.81,0,0,0,.07-4l-.07-.06L4.3.37ZM23.49,3.88,29.38.59,32,3.22,28.73,9.14l-3.42.52L21.39,13.6l-2.34-2.35L23,7.31ZM11.2,19l2.33,2.48L3.71,31.36a1.68,1.68,0,0,1-2.47.16,1.87,1.87,0,0,1,0-2.48l.14-.16Z" />
    </svg>
  );
};

export default ToolsIcon;
