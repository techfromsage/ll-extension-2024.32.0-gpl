import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
  fill?: string,
}

const ExpandIcon = ({ classes = [], fill = '#262626' }: Props) => {
  const percent = CalculateIconSize();
  return (
    <svg
      className={classes.join(' ')}
      width={`${percent}`}
      height={`${percent}`}
      fill={fill}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* eslint-disable-next-line max-len */}
      <path d="M12.44,5.33V8.89H3.56V28.44H23.11V19.56h3.56V30.22A1.78,1.78,0,0,1,24.89,32H1.78A1.78,1.78,0,0,1,0,30.22V7.11A1.81,1.81,0,0,1,.52,5.85a1.8,1.8,0,0,1,1.26-.52ZM32,0V14.22H28.44V6.07L14.59,19.92l-2.51-2.51L25.93,3.56H17.78V0Z" />
    </svg>
  );
};

export default ExpandIcon;
