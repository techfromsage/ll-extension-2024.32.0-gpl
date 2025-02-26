import React, { MouseEvent, ReactNode } from 'react';

interface Props {
  href: string,
  text: string | ReactNode,
  size?: string,
  className?: string,
  block?: boolean,
  onClick?: (event: MouseEvent) => void,
  asButton?: boolean,
}

const Link = ({
  href, text, size, className, block, asButton, onClick,
}: Props) => {
  const classes = [
    'link',
    className,
    block && 'link--block',
    size && `link--${size}`,
    asButton && 'link--as-button',
  ].filter(Boolean);

  const handleKeyUp = (event:React.KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === ' ' || event.key === 'Enter') {
      const targetLink = event.target as HTMLAnchorElement;
      targetLink.click();
    }
  };

  return (
    <a
      className={classes.join(' ')}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      onKeyUp={handleKeyUp}
    >
      {text}
    </a>
  );
};

export default Link;
