import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
}

const PenIcon = ({ classes = [] }: Props) => {
  const percent = CalculateIconSize();

  return (
    <svg
      className={classes.join(' ')}
      width={percent}
      height={percent}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.1611 3.00792L5.66966 7.49939L5.19826 8.91359L4.50428 9.60759L6.3899
        11.4932L7.08388 10.7993L8.49808 10.3278L12.9895 5.83634L10.1611 3.00792ZM14.4037
        5.36494C14.6641 5.62529 14.6641 6.0474 14.4037 6.30775L9.21835 11.4932L7.80408
        11.9646L6.86128 12.9074C6.60096 13.1678 6.17885 13.1678 5.9185 12.9074L3.09007
        10.079C2.82972 9.81866 2.82972 9.39652 3.09007 9.13619L4.03288 8.19339L4.50428
        6.77912L9.68975 1.5937C9.95008 1.33335 10.3722 1.33335 10.6325 1.5937L14.4037
        5.36494ZM10.1611 4.89354L11.1039 5.83634L7.80408 9.13619L6.86128 8.19339L10.1611
        4.89354ZM2.85437 11.2575L4.73999 13.1431L3.79718 14.0859L0.96875 13.1431L2.85437 11.2575Z"
        fill="#262626"
      />
    </svg>

  );
};

export default PenIcon;
