import React, { useContext, useState } from 'react';
import SettingsFormReactContext from '@/components/Context/SettingsFormReactContext';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import FormElement from '@/subComponents/Form/FormElement';
import Switch from '@/subComponents/Switches/Switch';
import ManagedDomain from '@/interfaces/ManagedDomain';

const ManageDomain = ({ domain, isBlocked }: ManagedDomain) => {
  const { sendSettingsFormsState } = useContext(SettingsFormReactContext);
  const [toggle, setToggle] = useState(!isBlocked);
  const name = 'managedDomains.domains';
  const handleDomain = () => {
    sendSettingsFormsState(SettingsFormEvent.Submit, { name, value: [domain] });
    setToggle(!toggle);
  };

  return (
    <FormElement type="switch">
      <Switch
        name={name}
        className="aside-switch"
        text="Allow popups on this domain"
        checked={toggle}
        onClick={handleDomain}
      />
    </FormElement>
  );
};

export default ManageDomain;
