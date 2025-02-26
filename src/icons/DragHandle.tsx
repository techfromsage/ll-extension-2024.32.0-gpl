import React from 'react';
import CalculateIconSize from '@/icons/CalculateIconSize';

interface Props {
  classes?: string[],
}

/**
 * Icon used to represent "draggable" items.
 * e.g. reordering items in Institution select field.
 * @param {string[] | undefined} classes
 * @returns {JSX.Element}
 * @constructor
 */
const DragHandle = ({ classes = [] }: Props) => {
  const percent = CalculateIconSize(-5.3);
  return (
    <svg
      className={classes?.join(' ')}
      xmlns="http://www.w3.org/2000/svg"
      width={`${percent}`}
      height={`${percent}`}
      viewBox="0 0 32 32"
    >
      <path d="M7.19,0h5.22v5.33h-5.22Z" />
      <path d="M20.23,0h5.22v5.33h-5.22Z" />
      <path d="M7.19,13.32h5.22v5.33h-5.22Z" />
      <path d="M20.23,13.32h5.22v5.33h-5.22Z" />
      <path d="M7.19,26.62h5.22v5.33h-5.22Z" />
      <path d="M20.23,26.62h5.22v5.33h-5.22Z" />
    </svg>
  );
};

export default DragHandle;
