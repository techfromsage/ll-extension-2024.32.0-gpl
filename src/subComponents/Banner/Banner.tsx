import React from 'react';
import Button from '@/subComponents/Buttons/Button';
import ComponentType from '@/enums/ui/ComponentType';

interface Props {
  title: string,
  message: JSX.Element,
  onClose: () => void,
  label?: JSX.Element,
  type?: ComponentType,
}

const Banner = ({
  title, message, onClose, label, type = ComponentType.Success,
}: Props) => {
  const classes = [
    'banner',
    `banner--${type}`,
  ];

  return (
    <div className={classes.join(' ')}>
      <div className="banner__header">
        <div className="banner__header__label">{label || <></>}</div>
        <div className="banner__header__close">
          <Button
            className="close"
            hiddenText
            onClick={() => {
              if (onClose) {
                onClose();
              }
            }}
            text="Dismiss banner"
          />
        </div>
      </div>
      <div className="banner__title">
        {title}
      </div>
      <div className="banner_message">
        {message}
      </div>
    </div>
  );
};

export default Banner;
