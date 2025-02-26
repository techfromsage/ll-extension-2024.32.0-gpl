import React from 'react';
import EnabledIntegrations from '@/components/SideTray/Settings/EnabledIntegrations';
import AppSettings from '@/interfaces/AppSettings';
import AdvancedCard from '@/subComponents/AdvancedCard/AdvancedCard';

interface Props {
  enabledIntegrationIds: string[],
  appSettings: AppSettings,
}

const SettingsIntegrations = ({ enabledIntegrationIds, appSettings }: Props) => {
  const integrations = EnabledIntegrations(enabledIntegrationIds, appSettings)
    .map(integration => (
      <AdvancedCard
        advancedCardItem={integration}
        key={integration.id}
        enabled={appSettings.integrations[integration.id].enabled}
        name={`integrations.${integration.id}.enabled`}
      />
    ));

  return (
    <div className="form-element">
      {integrations}
    </div>
  );
};

export default SettingsIntegrations;
