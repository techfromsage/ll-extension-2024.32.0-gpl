import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
}

const MaximiseIcon = ({ classes = [] }: Props) => {
  const percent = CalculateIconSize();
  return (
    <svg
      className={classes.join(' ')}
      width={`${percent}`}
      height={`${percent}`}
      fill="#262626"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m32 20.9h-4.48v6.49h-6.54v4.48h10.16v-.01h.86z" />
      <path d="m11.03 27.45h-6.5v-6.55h-4.48v10.17h.02v.86h10.96z" />
      <path d="m4.48 4.46h6.55v-4.48h-10.17v.01h-.86v10.96h4.48z" />
      <path d="m20.98 4.44h6.49v6.55h4.48v-10.17h-.01v-.86h-10.96z" />
    </svg>
  );
};

export default MaximiseIcon;
