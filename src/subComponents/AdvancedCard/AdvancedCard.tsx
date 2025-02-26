/**
 * The AdvancedCard component is a specialized version of the Card component that is
 * used to display its children, represented by AdvancedCardItem components, in a
 * grid structure, e.g. Integrations, Tools, etc.
 * The main props of each AdvancedCardItem, including title, button, description, logo,
 * and url, are displayed in a grid layout, while additional options, such as switch
 * toggles, are displayed below them.
 */

import React, { useContext } from 'react';
import SettingsFormReactContext from '@/components/Context/SettingsFormReactContext';
import Alert from '@/subComponents/Alert/Alert';
import browserMethods from '@/browserMethods';
import Switch from '@/subComponents/Switches/Switch';
import FormElement from '@/subComponents/Form/FormElement';
import SwitchEnable from '../Switches/SwitchEnable';
import Link from '../Link/Link';

export interface AdvancedCardItem {
  id: string,
  title: string,
  description?: string,
  logo?: string,
  url?: string,
  options?: AdvancedCardItemOption[],
}

export interface AdvancedCardItemOption {
  type: 'switch',
  label: string,
  value: boolean,
  name: string,
  disabled?: boolean,
  color?: string,
}

interface Props {
  advancedCardItem: AdvancedCardItem,
  name: string,
  enabled: boolean,
}

const AdvancedCard = ({ name, enabled, advancedCardItem }: Props) => {
  const { settingsFormData } = useContext(SettingsFormReactContext);
  const alertItem = settingsFormData.alert.find(([key]) => key === name);

  const options = advancedCardItem.options?.map(option => {
    return (
      <FormElement type="switch" htmlFor={option.name} alertKey={option.name} noMargin key={option.name}>
        <Switch
          checked={option.value}
          className="aside-switch"
          text={option.label}
          name={option.name}
          disabled={option.disabled}
          backgroundColor={option.color}
        />
      </FormElement>
    );
  });

  return (
    <>
      {!!alertItem && <Alert message={alertItem[1]} />}
      <div
        className="advanced-card"
        data-testid={`advanced-card-${advancedCardItem.title}`}
      >
        <div className="advanced-card__status">
          <h4 className="advanced-card__heading">{advancedCardItem.title}</h4>
          <SwitchEnable checked={enabled} name={name} />
        </div>
        <div className="advanced-card__main">
          {advancedCardItem.description && (
          <div className="advanced-card__body">
            <p>{advancedCardItem.description}</p>
            {advancedCardItem.url
              && <Link size="small" href={advancedCardItem.url} text={`More about ${advancedCardItem.title}`} />}
          </div>
          )}
          {advancedCardItem.logo && (
          <img
            data-testid="Logo"
            className="advanced-card__logo"
            alt={`Logo of ${advancedCardItem.title}`}
            src={browserMethods.runtime.getURL(advancedCardItem.logo)}
          />
          )}
        </div>
        {enabled && options && <div className="advanced-card__form_elements">{options}</div>}
      </div>
    </>
  );
};

export default AdvancedCard;
