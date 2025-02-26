import React from 'react';
import Select from '@/subComponents/Select/Select';
import Switch from '@/subComponents/Switches/Switch';

import FormElement from '@/subComponents/Form/FormElement';
import OptionsWidget from '@/subComponents/OptionsWidget/OptionsWidget';
import { InstitutionListItem } from '@/interfaces/InstitutionListItem';
import InstitutionObject from '@/interfaces/InstitutionObject';
import Institution from '@/interfaces/Institution';
import Translation from '@/interfaces/Translation';
import AppSettings from '@/interfaces/AppSettings';
import CustomSize from '@/enums/ui/CustomSize';
import FloatingActionPosition from '@/enums/ui/FloatingActionPosition';
import languageOptions from './languageOptions';

interface Props {
  translations: InstitutionObject<Translation>,
  appSettings: AppSettings,
  institutionsList: InstitutionListItem[],
  institutions: Institution[],
  onSelectChange: (name: string, newValues: { value: string }[]) => void,
}

const SettingsGeneral = (props: Props) => {
  const {
    translations, onSelectChange, institutionsList, institutions, appSettings,
  } = props;
  const [primary] = institutions;
  const institutionOptions = institutionsList.map(({ id, name }) => ({ id, value: id, label: name }));
  const defaultOptions = institutions.map(({ id, name }) => ({ id, value: id, label: name }));

  const showTranslation = translations && translations[primary?.id] && translations[primary.id].secondaryLang;
  const translationOptions = showTranslation
    ? languageOptions.filter(
      option => option.value === translations[primary.id].primaryLang || option.value === translations[primary.id].secondaryLang,
    )
    : [];
  const selectedTranslation = translationOptions.find(
    option => option.value === appSettings.language,
  );

  const textSizeOptions = [
    { value: CustomSize.ExtraSmall, label: 'Extra Small' },
    { value: CustomSize.Small, label: 'Small' },
    { value: CustomSize.Medium, label: 'Medium' },
    { value: CustomSize.Large, label: 'Large' },
    { value: CustomSize.ExtraLarge, label: 'Extra Large' },
  ];
  const textSizeSelected = textSizeOptions.find(option => option.value === appSettings.customTextSize);

  const fabPositionOptions = [
    { value: FloatingActionPosition.BottomRight, label: 'Bottom Right' },
    { value: FloatingActionPosition.BottomLeft, label: 'Bottom Left' },
    { value: FloatingActionPosition.TopLeft, label: 'Top Left' },
    { value: FloatingActionPosition.Off, label: 'Off' },
  ];
  const fabPositionSelected = fabPositionOptions.find(option => option.value === appSettings.fabPosition);

  const optionsMessages = [
    'Select primary institute',
    'Select secondary institute',
  ];
  const helpText = 'Select your institution below so that we can correctly configure your Library access.';

  return (
    <>
      <OptionsWidget
        options={institutionOptions}
        defaultValues={defaultOptions}
        maximum={2}
        optionsMessages={optionsMessages}
        title="Your institution"
        name="institutions"
        helpText={helpText}
        maximumMessage="Maximum institutes selected"
        onChange={onSelectChange}
      />

      {
        showTranslation
        && (
        <FormElement type="select" title="Language" alertKey="language">
          <Select
            options={translationOptions}
            value={selectedTranslation}
            name="language"
            onChange={newValue => onSelectChange('language', [newValue])}
            secondary
          />
        </FormElement>
        )
      }

      <FormElement type="select" title="Text size" alertKey="customTextSize">
        <Select
          options={textSizeOptions}
          value={textSizeSelected}
          name="customTextSize"
          onChange={newValue => onSelectChange('customTextSize', [newValue])}
          secondary
        />
      </FormElement>

      <FormElement type="select" title="Floating button position" alertKey="fabPosition">
        <Select
          options={fabPositionOptions}
          value={fabPositionSelected}
          name="fabPosition"
          onChange={newValue => onSelectChange('fabPosition', [newValue])}
          secondary
        />
      </FormElement>

      <FormElement type="switch" alertKey="showTimer">
        <Switch
          text="Show timer and close extension automatically."
          checked={appSettings.showTimer}
          name="showTimer"
        />
      </FormElement>
    </>
  );
};

export default SettingsGeneral;
