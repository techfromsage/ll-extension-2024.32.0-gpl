import React, { useState } from 'react';
import InfoIcon from '@/icons/InfoIcon';

interface Props {
  name?: string,
  text?: string,
  className?: string,
  onClick?: () => void,
  checked?: boolean,
  disabled?: boolean,
  backgroundColor?: string,
  hideIcon?: boolean,
  pauseIcon?: boolean,
  boldText?: boolean,
}

/* eslint-disable-next-line complexity */
const Switch: React.FC<Props> = ({
  name,
  text,
  className,
  onClick,
  backgroundColor,
  hideIcon,
  pauseIcon,
  checked = false,
  disabled = false,
  boldText = false,
}: Props) => {
  const classes = ['switch', className].filter(Boolean);
  const sliderClasses = [
    'slider',
    disabled && 'slider--disabled',
    checked && 'slider--checked',
    hideIcon && 'slider--hide-icon',
    pauseIcon && 'slider--pause-icon',
  ].filter(Boolean);

  const disabledSwitch = backgroundColor && disabled;

  const switchTextClasses = [
    'switch-text',
    backgroundColor && 'switch-text--highlighted',
    disabledSwitch && 'switch-text--disabled',
    boldText && 'switch-text--bold',
  ].filter(Boolean);

  const switchTextInlineStyle = backgroundColor ? { backgroundColor } : {};

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (disabled) {
      event.preventDefault();
    } else {
      onClick?.();
    }
  };

  return (
    <label
      className={`switch-label ${focused ? 'focused' : ''}`}
      htmlFor={name}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <div className={classes.join(' ')}>
        <input
          type="checkbox"
          checked={checked}
          readOnly
          name={name}
          onClick={handleClick}
          id={name}
          data-testid={`SwitchCheckbox-${name}`}
          aria-disabled={disabled}
          aria-describedby={disabledSwitch ? `switch-tooltip-${name}` : undefined}
        />
        <span className={sliderClasses.join(' ')} />
      </div>
      {text && (
        <span
          style={switchTextInlineStyle}
          className={switchTextClasses.join(' ')}
          data-testid={`switch-text-${name}`}
        >
          {text}
        </span>
      )}
      {disabledSwitch && (
        <>
          <InfoIcon classes={['switch-info-icon']} />
          <div
            className="switch-tooltip"
            id={`switch-tooltip-${name}`}
            role="tooltip"
          >
            This package is unavailable on this domain.
          </div>
        </>
      )}
    </label>
  );
};

export default Switch;
