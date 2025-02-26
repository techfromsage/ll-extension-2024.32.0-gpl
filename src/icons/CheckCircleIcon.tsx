import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
  fill?: string,
}

const CheckCircleIcon = ({ classes = [], fill = '#262626' }: Props) => {
  const percent = CalculateIconSize();
  return (
    <svg
      className={classes.join(' ')}
      width={`${percent}`}
      height={`${percent}`}
      fill={fill}
      viewBox="0 0 10 11"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* eslint-disable max-len */}
      <path
        d="M5.00001 9.66683C2.69882 9.66683 0.833344 7.80133 0.833344
        5.50016C0.833344 3.19898 2.69882 1.3335 5.00001 1.3335C7.30118 1.3335
        9.16668 3.19898 9.16668 5.50016C9.16668 7.80133 7.30118 9.66683 5.00001
        9.66683ZM5.00001 8.8335C6.84097 8.8335 8.33334 7.34112 8.33334
        5.50016C8.33334 3.65921 6.84097 2.16683 5.00001 2.16683C3.15906
        2.16683 1.66668 3.65921 1.66668 5.50016C1.66668 7.34112 3.15906
        8.8335 5.00001 8.8335ZM4.58443 7.16683L2.81667 5.39908L3.40593
        4.80979L4.58443 5.98833L6.94147 3.6313L7.53072 4.22055L4.58443 7.16683Z"
        fill={fill}
      />
    </svg>
  );
};

export default CheckCircleIcon;
