import React from 'react';
import CalculateIconSize from './CalculateIconSize';

interface Props {
  classes?: string[],
}

const EditIcon = ({ classes = [] }: Props) => {
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
        d="M8.77515 1.24346L7.60848 2.41012H1.91667V10.5768H10.0833V4.885L11.25
        3.71833V11.1601C11.25 11.4823 10.9888 11.7435 10.6667 11.7435H1.33333C1.01117
        11.7435 0.75 11.4823 0.75 11.1601V1.82679C0.75 1.50462 1.01117 1.24346 1.33333
        1.24346H8.77515ZM10.9498 0.71875L11.7747 1.54371L6.41247 6.90595L5.58898
        6.90735L5.58752 6.081L10.9498 0.71875Z"
        fill="#474747"
      />
    </svg>
  );
};

export default EditIcon;
