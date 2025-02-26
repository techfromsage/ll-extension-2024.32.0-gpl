import React, { useState } from 'react';
import Button from '../Buttons/Button';

interface Props {
  expandText: string,
  collapseText?: string,
  expansionHeader?: boolean,
  children: JSX.Element | JSX.Element[],
  child?: boolean,
}

const Aside = ({
  children, expandText, collapseText = expandText, expansionHeader, child = true,
}: Props) => {
  const [showChild, setShowChild] = useState(child);
  return (
    <>
      <Button
        className={`
          ${expansionHeader ? 'aside-expand' : 'aside-expand_inline'}
          ${showChild ? 'aside-expand--open' : 'aside-expand--closed'}
        `}
        buttonType="aside-expand"
        text={showChild ? collapseText : expandText}
        onClick={e => {
          e.preventDefault();
          setShowChild(!showChild);
        }}
      />
      <div className="aside-wrapper">
        <aside className={`aside ${showChild ? 'aside-open' : 'aside-closed'}`}>
          {children}
        </aside>
      </div>
    </>
  );
};

export default Aside;
