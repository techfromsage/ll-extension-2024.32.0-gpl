import Switch from '@/subComponents/Switches/Switch';
import React from 'react';
import Table from '@/subComponents/Table/Table';
import Aside from '@/subComponents/Aside/Aside';
import { SettingsFormContext } from '@/modules/shared/stateMachine/StateMachineSettingsForm';
import FormElement from '@/subComponents/Form/FormElement';
import AppSettings from '@/interfaces/AppSettings';

interface Props {
  handleRemove: (index: number) => void,
  settingsFormData: SettingsFormContext,
  appSettings: AppSettings,
}

const SettingsNotifications = ({
  handleRemove,
  settingsFormData: { enabledItems },
  appSettings,
}: Props) => {
  return (
    <>
      <h3 className="form-element__title">Preferences</h3>
      <p>
        Decide which pop-up notifications you want to see.
      </p>
      <FormElement type="switch-table" alertKey="managedDomains.enabled">
        <Switch
          checked={appSettings.managedDomains.enabled}
          className="aside-switch"
          text="Let me decide which sites I see messages on."
          name="managedDomains.enabled"
        />
        <>
          {
          appSettings.managedDomains.enabled
          && (
          <Aside expandText="Show" collapseText="Hide">
            <Table
              tableHeaders={['Message', 'Origin', 'Action']}
              tableContent={appSettings.managedDomains.domains}
              remove={handleRemove}
              tableCaption={'Sites I\'ve blocked'}
              tableEmptyText={'You can do this from the pop-up on the site that you\'d like to block notifications.'}
              hideColumnHeaders
            />
          </Aside>
          )
        }
        </>
      </FormElement>
      {
        enabledItems.autoRedirect
        && (
        <FormElement type="switch" alertKey="autoRedirect">
          <Switch
            checked={appSettings.autoRedirect}
            className="aside-switch"
            text="Automate my authentication and skip associated pop-ups."
            name="autoRedirect"
          />
        </FormElement>
        )
      }
      {appSettings.journalAlertsInstitution && (
      <FormElement type="switch" alertKey="journalAlerts">
        <Switch
          checked={appSettings.journalAlerts}
          className="aside-switch"
          text="Show me the option to register for email alerts within Google Scholar search results."
          name="journalAlerts"
        />
      </FormElement>
      )}
      <h3 className="form-element__title">Notify me</h3>
      {
        enabledItems.alternatives.article && (
          <FormElement type="switch" alertKey="alternatives.article">
            <Switch
              checked={appSettings.alternatives.article}
              className="aside-switch"
              text="When an article is found within my library’s holdings."
              name="alternatives.article"
            />
          </FormElement>
        )
      }
      {
        enabledItems.alternatives.ebook && (
          <FormElement type="switch" alertKey="alternatives.ebook">
            <Switch
              checked={appSettings.alternatives.ebook}
              className="aside-switch"
              text="When an ebook is found within my library’s holdings."
              name="alternatives.ebook"
            />
          </FormElement>
        )
      }
      {
        enabledItems.alternatives.openAccess && (
          <FormElement type="switch" alertKey="alternatives.openAccess">
            <Switch
              checked={appSettings.alternatives.openAccess}
              className="aside-switch"
              text="When an article has an Open Access version available."
              name="alternatives.openAccess"
            />
          </FormElement>
        )
      }
      {
        enabledItems.alternatives.orderForm && (
          <FormElement type="switch" alertKey="alternatives.orderForm">
            <Switch
              checked={appSettings.alternatives.orderForm}
              className="aside-switch"
              text='When I can request a resource via an "Inter-Library Loan" form'
              name="alternatives.orderForm"
            />
          </FormElement>
        )
      }
    </>
  );
};

export default SettingsNotifications;
