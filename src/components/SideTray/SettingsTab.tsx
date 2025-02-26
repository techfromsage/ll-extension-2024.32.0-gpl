/**
 * Component `Settings` presents settings form in the expanded "tray mode".
 */
import React, { FormEvent, useContext } from 'react';
import SettingsGeneral from '@/components/SideTray/Settings/SettingsGeneral';
import SettingsIntegrations from '@/components/SideTray/Settings/SettingsIntegrations';
import GeneralIcon from '@/icons/GeneralIcon';
import NotificationsIcon from '@/icons/NotificationsIcon';
import IntegrationsIcon from '@/icons/IntegrationsIcon';
import SettingsFormReactContext from '@/components/Context/SettingsFormReactContext';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import SettingsNotifications from '@/components/SideTray/Settings/SettingsNotifications';
import Accordion from '@/subComponents/Accordion/Accordion';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import ExtensionInformation from '@/subComponents/ExtensionInformation/ExtensionInformation';
import SettingsSciwheel from '@/components/SideTray/Settings/SettingsSciwheel';
import SciwheelIcon from '@/icons/SciwheelIcon';
import ReferenceManagerReactContext from '@/components/Context/ReferenceManagerReactContext';
import ReferenceManagerState from '@/enums/stateMachine/ReferenceManagerState';

/**
 * @returns {JSX.Element}
 * @constructor
 */
const SettingsTab = () => {
  const { settingsFormData, sendSettingsFormsState } = useContext(SettingsFormReactContext);
  const {
    storeState: {
      institutionsList, institutes, appSettings, translations,
    },
  } = useContext(AppActiveReactContext);
  const { referenceManager } = useContext(ReferenceManagerReactContext);

  const handleRemoveDomain = (index: number): void => {
    const name = 'managedDomains.domains';
    const domain = appSettings.managedDomains.domains[index];
    sendSettingsFormsState(SettingsFormEvent.Submit, { name, value: [domain] });
  };

  const onSwitchChange = (event: FormEvent) => {
    const target = event.target as HTMLInputElement;
    const { name, checked } = target;
    sendSettingsFormsState(SettingsFormEvent.Submit, { name, value: [checked] });
  };

  const onSelectChange = (name: string, newValues: { value: string }[]): void => {
    const value = newValues.map(item => item.value);
    sendSettingsFormsState(SettingsFormEvent.Submit, { name, value });
  };

  const integrationIds = Object
    .entries(settingsFormData.enabledItems.integrations)
    .filter(([_, enabled]) => enabled)
    .map(([integrationName]) => integrationName);

  const sciwheelStrapline = (referenceManager === ReferenceManagerState.NoUserSelected)
    ? 'Create or connect to your Sciwheel account to highlight, annotate and save your references.'
    : 'View your Sciwheel account information & access advanced settings.';

  const accordionItems = [
    {
      uuid: 'general',
      expanded: true,
      title: 'General',
      icon: <GeneralIcon />,
      content: <SettingsGeneral
        translations={translations}
        appSettings={appSettings}
        institutionsList={institutionsList}
        institutions={institutes}
        onSelectChange={onSelectChange}
      />,
    },
    {
      uuid: 'notifications',
      expanded: false,
      title: 'Notifications',
      icon: <NotificationsIcon />,
      strapline: 'Your library has already configured the extension for you, but you can adjust your preferences here:',
      content: <SettingsNotifications
        settingsFormData={settingsFormData}
        handleRemove={handleRemoveDomain}
        appSettings={appSettings}
      />,
    },
    appSettings.sciwheelEnabled && {
      uuid: 'sciwheel',
      expanded: false,
      title: 'Sciwheel',
      icon: <SciwheelIcon />,
      strapline: sciwheelStrapline,
      content: <SettingsSciwheel />,
    },
    integrationIds.length && {
      uuid: 'integrations',
      expanded: false,
      title: 'Integrations',
      icon: <IntegrationsIcon />,
      strapline: 'We integrated with trusted partners to enhance your workflow.',
      content: <SettingsIntegrations appSettings={appSettings} enabledIntegrationIds={integrationIds} />,
    },
    {
      uuid: 'extensionInfo',
      expanded: false,
      title: 'Extension information',
      content: <ExtensionInformation />,
    },
  ].filter(Boolean);

  const preExpandedUuids = accordionItems
    .filter(({ expanded }) => expanded)
    .map(({ uuid }) => uuid);

  return (
    <form id="SettingsForm" onChange={onSwitchChange}>
      <fieldset>
        <Accordion items={accordionItems} preExpandedUuids={preExpandedUuids} />
      </fieldset>
    </form>
  );
};

export default SettingsTab;
