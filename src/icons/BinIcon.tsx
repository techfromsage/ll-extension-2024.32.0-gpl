import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
}

const BinIcon = ({ classes = [] }: Props) => {
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
        d="M8.91406 2.50521H11.8307V3.67188H10.6641V11.2552C10.6641 11.5774 10.4029
        11.8385 10.0807 11.8385H1.91406C1.5919 11.8385 1.33073 11.5774 1.33073
        11.2552V3.67188H0.164062V2.50521H3.08073V0.755208C3.08073 0.433045 3.3419
        0.171875 3.66406 0.171875H8.33073C8.6529 0.171875 8.91406 0.433045 8.91406
        0.755208V2.50521ZM9.4974 3.67188H2.4974V10.6719H9.4974V3.67188ZM4.2474
        5.42188H5.41406V8.92188H4.2474V5.42188ZM6.58073 5.42188H7.7474V8.92188H6.58073V5.42188ZM4.2474
        1.33854V2.50521H7.7474V1.33854H4.2474Z"
        fill="#474747"
      />
    </svg>
  );
};

export default BinIcon;
