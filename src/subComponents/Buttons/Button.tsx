import React, { MouseEvent } from 'react';
import ButtonIcon from './ButtonIcon';

interface Props {
  className: string,
  text: string,
  hiddenText?: boolean,
  buttonType?: string,
  onClick?: (event: MouseEvent) => void,
  value?: string,
  name?: string,
  metadata?: string,
  disabled?: boolean,
}

const Button = (props: Props) => {
  const {
    className, text, hiddenText, buttonType, onClick, value, name, metadata, disabled = false,
  } = props;
  const classes = [
    className,
    disabled && 'button--disabled',
  ].filter(Boolean);

  return (
    <button
      data-testid={`Button-${text}`}
      className={classes.join(' ')}
      value={value}
      name={name}
      onClick={onClick}
      disabled={disabled}
      type="button"
      title={hiddenText ? text : undefined}
    >
      <ButtonIcon buttonType={buttonType || className} />
      <span data-metadata={metadata} className={`${hiddenText ? 'hidden-text' : ''}`}>
        {text}
      </span>
    </button>
  );
};

export default Button;
