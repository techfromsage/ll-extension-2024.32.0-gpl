import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
}

const PdfIncludedIcon = ({ classes = [] }: Props) => {
  const percent = CalculateIconSize();

  return (
    <svg
      className={classes.join(' ')}
      width={percent}
      height={percent}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.25 1.16592V1.16406H11.6654C11.9883 1.16406
        12.25 1.42966 12.25 1.74261V12.2522C12.25 12.5717 11.9905
        12.8307 11.6705 12.8307H2.32948C2.00944 12.8307 1.75 12.5683
        1.75 12.2434V4.66406L5.25 1.16592ZM3.40035 4.66406H5.25V2.8154L3.40035
        4.66406ZM6.41667 2.33073V5.2474C6.41667 5.56956 6.15551 5.83073 5.83333
        5.83073H2.91667V11.6641H11.0833V2.33073H6.41667Z"
        fill="#6E6E6E"
      />
      <path
        d="M8.82552 5.83594L6.35067 8.3108L4.90699 6.86714L4.08203
        7.69212L6.35067 9.9607L9.65047 6.66089L8.82552 5.83594Z"
        fill="#6E6E6E"
      />
    </svg>
  );
};

export default PdfIncludedIcon;
