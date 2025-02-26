import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
  backgroundColor?: string,
  textColor?: string,
}

const InfoIcon = ({ classes = [], backgroundColor = '#A8A8A8', textColor = '#FFFFFF' }: Props) => {
  const percent = CalculateIconSize();
  return (
    <svg
      className={classes.join(' ')}
      width={`${percent}`}
      height={`${percent}`}
      viewBox="0 0 13 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.125 14.25C9.50774 14.25 12.25 11.5077 12.25 8.125C12.25 4.74226 9.50774 2 6.125 2C2.74226 2 0 4.74226
        0 8.125C0 11.5077 2.74226 14.25 6.125 14.25Z"
        fill={backgroundColor}
      />
      <path
        d="M5.72949 11V6.2627H6.49414V11H5.72949ZM6.11621 5.34863C5.97266 5.34863 5.84814 5.29736 5.74268 5.19482C5.64014
        5.08936 5.58887 4.96484 5.58887 4.82129C5.58887 4.6748 5.64014 4.55029 5.74268 4.44775C5.84814 4.34521 5.97266
        4.29395 6.11621 4.29395C6.2627 4.29395 6.38721 4.34521 6.48975 4.44775C6.59229 4.55029 6.64355 4.6748 6.64355
        4.82129C6.64355 4.96484 6.59229 5.08936 6.48975 5.19482C6.38721 5.29736 6.2627 5.34863 6.11621 5.34863Z"
        fill={textColor}
      />
    </svg>
  );
};

export default InfoIcon;
