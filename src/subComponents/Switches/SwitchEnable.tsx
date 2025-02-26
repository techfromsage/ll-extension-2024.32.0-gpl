import React, { useState } from 'react';

// Used within integrations. Is a pill with either grey enable, or green enabled status
interface Props {
  name?: string,
  checked?: boolean,
}

const SwitchEnable = ({ name, checked = false }: Props) => {
  const [isChecked, setChecked] = useState<boolean>(checked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <label className={`${isChecked ? 'switch-enabled' : 'switch-enable'}`} htmlFor={name} data-testid={name}>
      <input type="checkbox" defaultChecked={checked} onChange={handleChange} name={name} id={name} />
      <span className="switch-enable-text">{isChecked ? 'Enabled' : 'Enable'}</span>
    </label>
  );
};

export default SwitchEnable;
