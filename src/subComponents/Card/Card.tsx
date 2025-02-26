import React from 'react';

interface Props {
  children: JSX.Element | JSX.Element[],
  className?: string,
  title?: string,
  titleIcon?: JSX.Element,
  highlightColor?: string,
}

const Card = ({
  children, className, title, titleIcon, highlightColor,
}: Props) => {
  const classes = [
    className,
  ].filter(Boolean);

  return (
    <div className={`card ${highlightColor ? 'card--annotation' : ''} card--default ${classes.join(' ')}`}>
      {highlightColor && <div className="card__annotation-color" style={{ background: highlightColor }} />}
      {title && (
      <p className="card__title">
        {titleIcon && <span className="card__title__icon">{titleIcon}</span>}
        <span>{title}</span>
      </p>
      )}
      {children}
    </div>
  );
};

export default Card;
