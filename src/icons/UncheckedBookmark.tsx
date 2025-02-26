import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
}

const UncheckedBookmark = ({ classes = [] }: Props) => {
  const percent = CalculateIconSize();
  return (
    <svg
      className={classes.join(' ')}
      width={`${percent}`}
      height={`${percent}`}
      fill="none"
      viewBox="0 0 16 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33366 3.33203H12.667C13.0352 3.33203 13.3337 3.63051 13.3337
        3.9987V16.7609C13.3337 16.945 13.1844 17.0943 13.0003 17.0943C12.9377
        17.0943 12.8763 17.0766 12.8233 17.0433L8.00033 14.0196L3.17739 17.0433C3.02141
        17.1411 2.8157 17.094 2.71791 16.938C2.68464 16.8849 2.66699 16.8236 2.66699
        16.7609V3.9987C2.66699 3.63051 2.96547 3.33203 3.33366 3.33203ZM12.0003
        4.66536H4.00033V14.9536L8.00033 12.4458L12.0003 14.9536V4.66536Z"
        fill="#00A980"
      />
    </svg>
  );
};

export default UncheckedBookmark;
