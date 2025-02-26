import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
}

const SettingsIcon = ({ classes = [] }: Props) => {
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
      <path d="M11.14,4.67,15,.84A1.47,1.47,0,0,1,17,.84l3.82,3.83h5.42a1.42,1.42,0,0,1,1,.43,1.44,1.44,0,0,1,.43,1v5.41l3.83,3.82a1.47,1.47,0,0,1,0,2.08l-3.83,3.83v5.41a1.47,1.47,0,0,1-1.46,1.47H20.86L17,32A1.47,1.47,0,0,1,15,32l-3.82-3.82H5.72a1.47,1.47,0,0,1-1.46-1.47V21.28L.43,17.45a1.47,1.47,0,0,1,0-2.08l3.83-3.82V6.14a1.44,1.44,0,0,1,.43-1,1.42,1.42,0,0,1,1-.43ZM7.19,7.6v5.16L3.55,16.41l3.64,3.65v5.16h5.16L16,28.87l3.65-3.65h5.16V20.06l3.64-3.65-3.64-3.65V7.6H19.65L16,4,12.35,7.6ZM16,22.28a5.87,5.87,0,1,1,4.15-1.72A5.82,5.82,0,0,1,16,22.28Zm0-2.93a2.92,2.92,0,0,0,2.93-2.94,2.91,2.91,0,0,0-.85-2.07,2.95,2.95,0,0,0-4.16,0,3,3,0,0,0,0,4.15A3,3,0,0,0,16,19.35Z" />
    </svg>
  );
};

export default SettingsIcon;
