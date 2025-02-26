import React from 'react';
import CalculateIconSize from '@/icons/CalculateIconSize';

interface Props {
  classes?: string[],
}

const ArrowLeft = ({ classes = [] }: Props) => {
  const percent = CalculateIconSize(-5.3);
  return (
    <svg
      className={classes?.join(' ')}
      id="IconArrowLeft"
      width={percent}
      height={percent}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m 13.089913,15.999999 13.57676,12.445 L 22.788391,32 5.333327,15.999999 22.788353,4.2381348e-8 26.666673,3.5549959 Z"
      />
    </svg>

  );
};

export default ArrowLeft;
