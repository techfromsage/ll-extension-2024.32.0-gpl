import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
}

const NotificationsIcon = ({ classes = [] }: Props) => {
  const percent = CalculateIconSize();
  return (
    <svg
      className={classes.join(' ')}
      width={`${percent}`}
      height={`${percent}`}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* eslint-disable-next-line max-len */}
      <path d="M29.27,25.93H2.73V13A13.16,13.16,0,0,1,16,0,13.16,13.16,0,0,1,29.27,13Zm-24-2.45H26.76V13A10.67,10.67,0,0,0,16,2.46,10.67,10.67,0,0,0,5.24,13Z" />
      <path d="M11.75,28H20a4.12,4.12,0,0,1-8.24,0Z" />
    </svg>
  );
};

export default NotificationsIcon;
