import React from 'react';

interface Props {
  name: string,
  value: string,
  checked: boolean,
}

const CampaignRadio = ({
  name, value, checked = false,
}: Props) => {
  return (
    <label className="radio__wrapper--campaign" htmlFor={`${name}-${value}`}>
      <input
        type="radio"
        name={name}
        value={value}
        id={`${name}-${value}`}
        defaultChecked={checked}
      />
      {(value) && (
        <span className="radio__text" data-testid="CampaignRadio">{value}</span>
      )}
    </label>
  );
};

export default CampaignRadio;
