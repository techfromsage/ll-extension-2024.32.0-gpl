import React, { FormEvent, useContext } from 'react';
import ToolsIcon from '@/icons/ToolsIcon';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import AppSettings from '@/interfaces/AppSettings';
import KeywordPackage from '@/interfaces/keywordEnhancements/KeywordPackage';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import SettingsFormReactContext from '@/components/Context/SettingsFormReactContext';
import AdvancedCard, { AdvancedCardItemOption } from '@/subComponents/AdvancedCard/AdvancedCard';
import { AccordionItemValues } from '@/subComponents/Accordion/Accordion';
import PlatformCheck from '@/modules/shared/platforms/PlatformCheck';
import Platform from '@/interfaces/Platform';
import WildcardUrlMatch from '@/modules/shared/WildcardUrlMatch';

const EnabledTools = (
  appSettings: AppSettings,
  keywordPackages: KeywordPackage[],
): AccordionItemValues => {
  const { sendSettingsFormsState } = useContext(SettingsFormReactContext);
  const { storeState: { institutes: [institute] } } = useContext(AppActiveReactContext);
  const { customizations } = appSettings;
  const onSwitchChange = (event: FormEvent) => {
    const target = event.target as HTMLInputElement;
    if (target.ariaDisabled === 'true') {
      event.preventDefault();
      return;
    }

    const { name, checked } = target;
    sendSettingsFormsState(SettingsFormEvent.Submit, { name, value: [checked] });
  };

  const isKeywordPackageDisabled = (keywordsPackage: KeywordPackage) => {
    const url = new URL(document.location.href);
    return !keywordsPackage.resource_links.some(domain => WildcardUrlMatch(url).match(domain));
  };

  const keywordPackagesOptions = keywordPackages
    .map<AdvancedCardItemOption>(keywordsPackage => ({
    type: 'switch',
    label: keywordsPackage.name,
    value: appSettings.keywordEnhancements.packages[keywordsPackage.uuid],
    name: `keywordEnhancements.packages.${keywordsPackage.uuid}`,
    metadata: keywordsPackage.uuid,
    disabled: isKeywordPackageDisabled(keywordsPackage),
    color: keywordsPackage.color,
  })).sort((a, b) => (+!!a.disabled - +!!b.disabled));

  const platform = PlatformCheck(window.location.href).current();
  const shouldDisplayLibrarySearch = platform === Platform.Google || platform === Platform.GoogleScholar;

  const keywordPackagesEnabled = institute.modules_enabled.keyword_enhancement && !!keywordPackages.length;
  const librarySearchEnabled = institute.modules_enabled.library_search && shouldDisplayLibrarySearch;

  const anyKeywordPackageEnabled = keywordPackagesOptions.some(option => !option.disabled);

  const expanded = (keywordPackagesEnabled && anyKeywordPackageEnabled) || librarySearchEnabled;

  return {
    uuid: 'tools',
    expanded,
    icon: <ToolsIcon />,
    title: customizations.tools_text,
    strapline: customizations.tools_description,
    contentLength: [
      institute.modules_enabled?.keyword_enhancement
        && !!keywordPackages.length,
      institute.modules_enabled?.library_search && shouldDisplayLibrarySearch,
    ].filter(Boolean).length,
    content: (
      <>
        {keywordPackagesEnabled && (
          <div className="form-element" onChange={onSwitchChange}>
            <AdvancedCard
              advancedCardItem={{
                id: 'keywordEnhancements',
                title: customizations.keyword_enhancement_text,
                description:
                  'Specific keywords will be highlighted with content from your library.',
                options: keywordPackagesOptions,
              }}
              key="keywordEnhancements"
              enabled={appSettings.keywordEnhancements.enabled}
              name="keywordEnhancements.enabled"
            />
          </div>
        )}
        {librarySearchEnabled && (
          <div className="form-element" onChange={onSwitchChange}>
            <AdvancedCard
              advancedCardItem={{
                id: 'librarySearch',
                title: customizations.additional_library_search_text,
                description: `Relevant content you have access to via your library will be displayed
              alongside Google and Google Scholar results.`,
              }}
              key="librarySearch"
              enabled={appSettings.librarySearch}
              name="librarySearch"
            />
          </div>
        )}
      </>
    ),
  };
};

export default EnabledTools;
