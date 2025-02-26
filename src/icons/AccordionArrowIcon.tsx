import React from 'react';

interface Props {
  expanded: boolean,
}

const AccordionArrowIcon = ({ expanded }: Props) => {
  const classes = [
    'accordion__arrow',
    expanded ? 'accordion__arrow--close' : 'accordion__arrow--open',
  ].filter(Boolean);

  return (
    <div className={classes.join(' ')}>
      <svg
        fill="#262626"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16,13.53,3.55,25.75,0,22.25,16,6.55l16,15.7-3.55,3.5Z" />
      </svg>
    </div>
  );
};

export default AccordionArrowIcon;
