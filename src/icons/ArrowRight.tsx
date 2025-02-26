import React from 'react';
import CalculateIconSize from '@/icons/CalculateIconSize';

interface Props {
  classes?: string[],
}

const ArrowRight = ({ classes = [] }: Props) => {
  const percent = CalculateIconSize(-5.3);
  return (
    <svg
      className={classes?.join(' ')}
      id="IconArrowRight"
      width={percent}
      height={percent}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 18.910087,15.999999 5.333327,28.444999 9.211609,32 26.666673,15.999999 9.211647,4.2381348e-8 5.333327,3.5549959 Z"
      />
    </svg>
  );
};

export default ArrowRight;
