import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
}

const CopyIcon = ({ classes = [] }: Props) => {
  const percent = CalculateIconSize();

  return (
    <svg
      className={classes.join(' ')}
      width={percent}
      height={percent}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.08333 1.33854V0.171875H8.91667V1.33854H10.6705C10.9905 1.33854 11.25
        1.5981 11.25 1.91803V11.2591C11.25 11.5791 10.9905 11.8385 10.6705
        11.8385H1.32948C1.00944 11.8385 0.75 11.579 0.75 11.2591V1.91803C0.75
        1.59799 1.00955 1.33854 1.32948 1.33854H3.08333ZM3.08333
        2.50521H1.91667V10.6719H10.0833V2.50521H8.91667V3.67188H3.08333V2.50521ZM4.25
        1.33854V2.50521H7.75V1.33854H4.25Z"
        fill="#474747"
      />
    </svg>
  );
};

export default CopyIcon;
