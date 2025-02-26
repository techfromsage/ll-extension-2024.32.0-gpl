import React from 'react';

interface Props {
  data: {
    value: string,
    label: string,
    title: string,
    isRecent?: boolean,
  },
}

const CitationModalSelectOption = ({
  data: {
    value, label, title, isRecent,
  },
}: Props) => {
  return (
    <>
      <div className="citation__select-option" aria-describedby={`select-option-tooltip-${value}`}>
        <span className="citation__select-option__style">
          {label}
        </span>
        {isRecent && <span className="citation__select-option__recent">Recent</span>}
        <div
          className="citation__select-option__tooltip"
          id={`select-option-tooltip-${value}`}
          role="tooltip"
        >
          {title}
        </div>
      </div>
    </>
  );
};

export default CitationModalSelectOption;
