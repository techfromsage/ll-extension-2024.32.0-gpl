import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
}

const CheckedBookmark = ({ classes = [] }: Props) => {
  const percent = CalculateIconSize();
  return (
    <svg
      className={classes.join(' ')}
      width={`${percent}`}
      height={`${percent}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33366 1.33203H12.667C13.0352 1.33203 13.3337 1.63051 13.3337
        1.9987V14.7609C13.3337 14.945 13.1844 15.0943 13.0003 15.0943C12.9377 15.0943
        12.8763 15.0766 12.8233 15.0433L8.00033 12.0196L3.17739 15.0433C3.02141 15.1411
        2.8157 15.094 2.71791 14.938C2.68464 14.8849 2.66699 14.8236 2.66699 14.7609V1.9987C2.66699
        1.63051 2.96547 1.33203 3.33366 1.33203Z"
        fill="#00A980"
      />
    </svg>
  );
};

export default CheckedBookmark;
