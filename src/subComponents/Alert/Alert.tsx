import React from 'react';
import ComponentType from '@/enums/ui/ComponentType';

interface Props {
  message: string | JSX.Element,
  type?: ComponentType,
  icon?: JSX.Element,
  className?: string,
}

const Alert = ({
  message, type = ComponentType.Success, icon, className,
}: Props) => {
  const classes = [
    'alert',
    `alert--${type}`,
    'fade-in',
    className,
  ];

  return message
    ? (
      <div className={classes.join(' ')}>
        {icon}
        {message}
      </div>
    )
    : <></>;
};

export default Alert;
