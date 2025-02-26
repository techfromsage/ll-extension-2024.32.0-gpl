import React from 'react';

type LogoType = 'popup' | 'sidetray' | 'modal' | 'board' | 'fab' | 'citation-modal';

interface Props {
  src: string,
  alt: string,
  type: LogoType,
}

const Logo = ({ src, alt, type }: Props) => {
  const classes = [
    'logo',
    `logo--${type}`,
  ];
  return (
    <img data-testid="Logo" className={classes.join(' ')} src={src} alt={alt} />
  );
};

export default Logo;
