import React from 'react';
import ComponentType from '@/enums/ui/ComponentType';

interface Props {
  text: string,
  type?: ComponentType,
}

const Label = ({ text, type = ComponentType.Success }: Props) => {
  const classes = [
    'label',
    `label--${type}`,
  ];
  return (
    <span className={classes.join(' ')}>
      {text}
    </span>
  );
};

export default Label;
