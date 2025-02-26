import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
}

const JumpToIcon = ({ classes = [] }: Props) => {
  const percent = CalculateIconSize();

  return (
    <svg
      className={classes.join(' ')}
      width={percent}
      height={percent}
      viewBox="0 0 11 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.87479 0.875L5.69974 1.69996L2.98323 4.41646L8.33349
        4.41652V5.58319L2.98326 5.58313L5.69974 8.2996L4.87479 9.12461L0.75
        4.9998L4.87479 0.875ZM9.50009 9.08307V0.916423H10.6668V9.08307H9.50009Z"
        fill="#474747"
      />
    </svg>
  );
};

export default JumpToIcon;
