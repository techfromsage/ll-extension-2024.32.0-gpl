/* See associated github commit for more context - re select list definition - this select list is a pseudo element designed
to replace the select list of options available in a native html select element. */
import React, { MouseEventHandler } from 'react';
import exampleLanguageIcon from '@/assets/img/Example_Language_Icon.png';
import browserMethods from '@/browserMethods';

const SelectList: React.FC<{
  id: string,
  optionsArray: Array<object>,
  handleMouseEnter: MouseEventHandler,
  handleMouseLeave: MouseEventHandler,
  visible: boolean,
  selectItem: any,
  selected: object,
  mouseInside: boolean,
  setOptionRef: any,
  hasIcons: boolean,
}> = ({
  id,
  optionsArray,
  handleMouseEnter,
  handleMouseLeave,
  visible,
  selectItem,
  selected,
  mouseInside,
  setOptionRef,
  hasIcons,
}) => {
  // eslint-disable-next-line react/no-string-refs
  return (
    <ul
      id={id}
      className={`select-list ${visible ? 'select-options' : 'select-options--hidden'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="listbox"
    >
      {/* eslint-disable-next-line @typescript-eslint/ban-types */}
      {optionsArray.map((option: Object) => {
        const selectValue = Object.values(option)[0];
        const selectKey = Number(Object.keys(option)[0]);
        const selectIcon = Object.values(option)[1] !== '' ? Object.values(option)[1] : exampleLanguageIcon;
        return (
          <li
            className={`select-item ${option === selected && !mouseInside ? 'selected-item' : ''}`}
            onClick={e => selectItem(option, e)}
            onKeyDown={e => selectItem(option, e)}
            key={selectKey}
            aria-selected={option === selected}
            role="option"
            value={Object.keys(option)[0]}
            tabIndex={-1}
            aria-posinset={selectKey}
            aria-setsize={optionsArray.length}
            ref={setOptionRef}
          >
            {(hasIcons)
          && <img className="select-icon" alt="" src={browserMethods.runtime.getURL(selectIcon)} />}
            {selectValue}
          </li>
        );
      })}
    </ul>
  );
};

export default SelectList;
