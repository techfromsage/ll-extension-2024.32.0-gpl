import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
  fill?: string,
}

const UndoIcon = ({ classes = [], fill = '#4582F9' }: Props) => {
  const percent = CalculateIconSize();
  return (
    <svg
      width={percent}
      height={percent}
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes.join(' ')}
    >
      <path
        d="M1.91226 3.71706L3.18003 4.98483L2.47292 5.69194L-0.00195312
        3.21706L2.47292 0.742188L3.18003 1.4493L1.91226 2.71706H5.49805C7.7072
        2.71706 9.49805 4.50792 9.49805 6.71709C9.49805 8.92619 7.7072 10.7171
        5.49805 10.7171H0.998047V9.71709H5.49805C7.1549 9.71709 8.49805 8.37394
        8.49805 6.71709C8.49805 5.06021 7.1549 3.71706 5.49805 3.71706H1.91226Z"
        fill={fill}
      />
    </svg>

  );
};

export default UndoIcon;
