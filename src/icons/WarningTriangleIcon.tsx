import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
  fill?: string,
}

const WarningTriangleIcon = ({ classes = [], fill = '#CEA333' }: Props) => {
  const percent = CalculateIconSize();
  return (
    <svg
      className={classes.join(' ')}
      width={`${percent}`}
      height={`${percent}`}
      fill={fill}
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* eslint-disable max-len */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.18993 1.2358L9.35924 7.57442C9.68787 8.23168 9.42146 9.0309
        8.7642 9.35953C8.57945 9.45191 8.37573 9.5 8.16916 9.5H1.83054C1.0957
        9.5 0.5 8.90429 0.5 8.16946C0.5 7.9629 0.548093 7.75917 0.640469
        7.57442L3.80978 1.2358C4.13841 0.578538 4.93763 0.312131 5.59489
        0.640761C5.85239 0.769509 6.06118 0.978301 6.18993 1.2358ZM5 6.40625C4.53401
        6.40625 4.15625 6.78401 4.15625 7.25C4.15625 7.71599 4.53401 8.09375
        5 8.09375C5.46599 8.09375 5.84375 7.71599 5.84375 7.25C5.84375 6.78401
        5.46599 6.40625 5 6.40625ZM5 5.5625C5.31066 5.5625 5.5625 5.38261
        5.5625 5.16071V3.15179C5.5625 2.92989 5.31066 2.75 5 2.75C4.68934
        2.75 4.4375 2.92989 4.4375 3.15179V5.16071C4.4375 5.38261 4.68934 5.5625 5 5.5625Z"
        fill={fill}
      />
    </svg>
  );
};

export default WarningTriangleIcon;
