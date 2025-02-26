import React, { useContext, useEffect, useState } from 'react';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import { InstitutionListItem } from '@/interfaces/InstitutionListItem';
import SettingsFormReactContext from '@/components/Context/SettingsFormReactContext';
import AccordionGeneralIcon from '@/icons/GeneralIcon';
import CelebrateIcon from '@/icons/CelebrateIcon';
import FormElement from '@/subComponents/Form/FormElement';
import Select from '@/subComponents/Select/Select';
import browserMethods from '@/browserMethods';
import placeholderLogo from '@/assets/svg/placeholderLogo.svg';
import Logo from '@/subComponents/Logo/Logo';
import ReferenceManagerReactContext from '@/components/Context/ReferenceManagerReactContext';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import Accordion, { AccordionItemValues } from '@/subComponents/Accordion/Accordion';
import Alert from '@/subComponents/Alert/Alert';
import ComponentType from '@/enums/ui/ComponentType';
import InfoIcon from '@/icons/InfoIcon';
import ReferenceManagerState from '@/enums/stateMachine/ReferenceManagerState';

interface Props {
  institutionsList: InstitutionListItem[],
  isOptions?: boolean,
  isToolbar?: boolean,
}

/**
 * The setup panel is used when the extension is installed for the first time.
 * It lets the user select their institution.
 */
const SetupPanel = ({ institutionsList, isOptions, isToolbar }: Props) => {
  const { storeState: { config, defaultInstitution, institutes } } = useContext(AppActiveReactContext);
  const { sendSettingsFormsState } = useContext(SettingsFormReactContext);
  const { referenceManager } = useContext(ReferenceManagerReactContext);
  const [showSciwheelAlert, setShowSciwheelAlert] = useState(false);

  const openInstitutionId = config?.leanlibraryOpenId;
  const fallbackInstitution = {
    value: openInstitutionId,
    label: 'Other - Institution not listed',
  };
  const institutionOptions = [
    ...institutionsList.map(({ id, name }) => ({ value: id, label: name })),
    fallbackInstitution,
  ];
  const filterInstitutions = (
    candidate: { label: string, value: string, data: any },
    input: string,
  ) => {
    if (input) {
      return candidate.label.toLowerCase().includes(input.toLowerCase()) || candidate.label === fallbackInstitution.label;
    }
    return true;
  };

  const [previousInstitutesLength, setPreviousInstitutesLength] = useState(0);
  const [institutesLength, setInstitutesLength] = useState(0);

  const onChange = (newInstitution: { value: string }): void => {
    setPreviousInstitutesLength(institutesLength);
    setInstitutesLength(institutesLength + 1);
    sendSettingsFormsState(SettingsFormEvent.Submit, { name: 'institutions', value: [newInstitution.value] });
  };

  useEffect(() => {
    if (defaultInstitution.length) {
      onChange({ value: defaultInstitution });
    }
    // Show the SciWheel alert if showSciwheelAlert is true
    if (referenceManager !== ReferenceManagerState.Off
      && referenceManager !== ReferenceManagerState.NoUserSelected
      && referenceManager !== ReferenceManagerState.Login) {
      setShowSciwheelAlert(true);
      const timer = setTimeout(() => {
        setShowSciwheelAlert(false);
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
    return () => {};
  }, []);

  useEffect(() => {
    // we want to show onboarding only when there is one institution
    // and when previous institution length is 0 and not 2.
    if (isOptions && institutesLength === 1 && previousInstitutesLength === 0) {
      sendSettingsFormsState(SettingsFormEvent.Submit, { name: 'showPinTooltipTutorialTab', value: [true] });
    }
  }, [institutesLength, institutes]);

  const accordionItems: AccordionItemValues[] = [
    {
      uuid: 'general',
      expanded: true,
      title: 'Select your institution',
      icon: <AccordionGeneralIcon />,
      strapline: 'Welcome to the Lean Library extension. To get started, please select your institution below.',
      content: (
        <div>
          <FormElement type="select" title="Your institution" htmlFor="Your institution">
            <Select
              name="Your institution"
              options={institutionOptions}
              onChange={onChange}
              placeholder="Select institute..."
              isToolbar={isToolbar}
              filterOption={filterInstitutions}
            />
          </FormElement>
        </div>),
    },
  ].filter(Boolean);

  return (
    <>
      <Logo
        src={browserMethods.runtime.getURL(placeholderLogo)}
        type="sidetray"
        alt="Lean Library Logo"
      />
      { !isOptions && !showSciwheelAlert && (
      <Alert
        type={ComponentType.Info}
        message="For the extension to continue working, please select your institution or library below."
        icon={<InfoIcon backgroundColor="#3356b5" />}
        className="alert--text-left"
      />
      )}
      { !isOptions && showSciwheelAlert && (
      <Alert
        type={ComponentType.Success}
        message="Welcome aboard! Lean Library has automatically connected to your Sciwheel account."
        icon={<CelebrateIcon />}
        className="alert--text-left"
      />
      )}
      <h1 data-testid="SetupPanel" className="heading">Welcome to Lean Library!</h1>
      <Accordion items={accordionItems} allowZeroExpanded={false} preExpandedUuids={['general']} />
    </>
  );
};

export default SetupPanel;
