import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
}

const DoubleQuotesIcon = ({ classes = [] }: Props) => {
  const percent = CalculateIconSize();
  return (
    <svg
      className={classes.join(' ')}
      width={`${percent}`}
      height={`${percent}`}
      fill="#262626"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* eslint-disable max-len */}
      <path
        d="M13.7568 3.55647C14.5657 4.41515 15 5.37886 15 6.94106C15 9.68859
        13.0713 12.1517 10.2651 13.3691L9.56422 12.2875C12.1829 10.8706 12.6947
        9.03284 12.8993 7.87404C12.4776 8.09208 11.9257 8.16871 11.3847
        8.11862C9.96794 7.98726 8.85139 6.82423 8.85139 5.37886C8.85139
        3.86118 10.0817 2.63086 11.5994 2.63086C12.4419 2.63086 13.2476
        3.01593 13.7568 3.55647ZM5.90537 3.55647C6.71423 4.41515 7.14857
        5.37886 7.14857 6.94106C7.14857 9.68859 5.21986 12.1517 2.4137
        13.3691L1.71281 12.2875C4.33145 10.8706 4.84325 9.03284 5.04782
        7.87404C4.6262 8.09208 4.07428 8.16871 3.53322 8.11862C2.11653
        7.98726 1 6.82423 1 5.37886C1 3.86118 2.23032 2.63086 3.748
        2.63086C4.5905 2.63086 5.39616 3.01593 5.90537 3.55647Z"
        fill="#262626"
      />
    </svg>
  );
};

export default DoubleQuotesIcon;
