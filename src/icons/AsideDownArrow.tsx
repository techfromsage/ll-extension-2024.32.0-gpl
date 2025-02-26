import React from 'react';
import CalculateIconSize from './CalculateIconSize';

const AsideDownArrow: React.FC = () => {
  const percent = CalculateIconSize(-6);
  return (
    <svg
      className="aside_down_icon"
      width={`${percent}`}
      height={`${percent}`}
      fill="#262626"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16,30.44,0,7.58H32Z" />
    </svg>
  );
};

export default AsideDownArrow;
