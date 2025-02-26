import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
  fill?: string,
}

const RetryIcon = ({ classes = [], fill = '#6E6E6E' }: Props) => {
  const percent = CalculateIconSize();
  return (
    <svg
      className={classes.join(' ')}
      width={`${percent}`}
      height={`${percent}`}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.14188 2.59636C4.31054 1.58586 5.83396 0.974609 7.50016
        0.974609C11.182 0.974609 14.1668 3.95938 14.1668 7.64128C14.1668
        9.06534 13.7203 10.3851 12.9596 11.4683L10.8335 7.64128H12.8335C12.8335
        4.69576 10.4457 2.30794 7.50016 2.30794C6.06671 2.30794 4.76534
        2.87346 3.80698 3.79356L3.14188 2.59636ZM11.8584 12.6862C10.6898
        13.6967 9.16636 14.3079 7.50016 14.3079C3.81826 14.3079 0.833496
        11.3231 0.833496 7.64128C0.833496 6.21718 1.28002 4.89738 2.0407
        3.81424L4.16683 7.64128H2.16683C2.16683 10.5868 4.55464 12.9746
        7.50016 12.9746C8.93363 12.9746 10.235 12.4091 11.1934 11.489L11.8584 12.6862Z"
        fill={fill}
      />
    </svg>

  );
};

export default RetryIcon;
