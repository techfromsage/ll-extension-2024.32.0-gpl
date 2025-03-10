import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
}

const GreenCheckIcon = ({ classes = [] }: Props) => {
  const percent = CalculateIconSize();
  return (
    <svg
      className={classes.join(' ')}
      width={`${percent}`}
      height={`${percent}`}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.29744 13.2131L0.292893 8.2546C-0.0976311 7.86082 -0.0976311 7.22236
        0.292893 6.82857C0.683418 6.43478 1.31658 6.43478 1.70711 6.82857L6.00068 11.0535L14.2889
        2.79534C14.6794 2.40155 15.3126 2.40155 15.7031 2.79534C16.0936 3.18913 16.0936
        3.82759 15.7031 4.22138L6.69941 13.2085C6.31158 13.5954 5.68777 13.5974 5.29744 13.2131Z"
        fill="#00A980"
      />
    </svg>

  );
};

export default GreenCheckIcon;
