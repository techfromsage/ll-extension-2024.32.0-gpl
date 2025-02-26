/**
 * AppSettingsForInstitutions sets/overwrites settings based on institution settings.
 */
import merge from 'lodash.merge';
import AppSettings from '@/interfaces/AppSettings';
import { StoreState } from '@/store';
import Institution from '@/interfaces/Institution';
import FloatingActionPosition from '@/enums/ui/FloatingActionPosition';

/**
 * Calculates the Alternatives settings based on selected institution settings.
 *
 * @param {AppSettings} current
 * @param {Institution} institution
 * @returns {{
 * orderForm: boolean,
 * ebook: boolean,
 * openAccess: boolean,
 * openAccessEbook: boolean,
 * article: boolean,
 * orderForm: boolean,
 * orderFormBook: boolean,
 * printBook: boolean
 * }}
 */
// eslint-disable-next-line complexity
export const alternativeSettings = (current: Subset<AppSettings>, institution: Institution) => {
  const {
    enabled,
    fullTextFinder,
    ebookFinder,
    openAccess,
    orderForm,
    order_form: orderFormBooks,
    open_access_ebooks: openAccessEbooks,
    print_book_alternatives: printBooks,
  } = institution.alternatives;

  return {
    article: current.alternatives?.article || (enabled && fullTextFinder.enabled),
    ebook: current.alternatives?.ebook || (enabled && ebookFinder.enabled),
    openAccessEbook: current.alternatives?.openAccessEbook || (enabled && openAccessEbooks?.enabled),
    openAccess: current.alternatives?.openAccess || (enabled && openAccess.enabled),
    orderForm: current.alternatives?.orderForm || (enabled && orderForm.enabled),
    orderFormBook: current.alternatives?.orderFormBook || (enabled && orderFormBooks?.isbn?.enabled),
    printBook: current.alternatives?.printBook || (enabled && printBooks?.enabled),
  };
};

/**
 * Calculates Integration settings based on institutions
 *
 * @param {Subset<AppSettings["integrations"]>} all
 * @param {Institution} institution
 * @returns {AppSettings["integrations"]}
 */
const integrations = (all: Subset<AppSettings['integrations']>, institution: Institution): AppSettings['integrations'] => {
  return {
    scite: {
      enabled: all.scite?.enabled || institution.scite.enabled,
      googleScholar: all.scite?.googleScholar || institution.scite.googleScholarEnabled,
      elsewhere: all.scite?.elsewhere || institution.scite.elsewhereEnabled,
    },
    citation: {
      enabled: all.citation?.enabled || institution.modules_enabled.citations,
    },
  };
};

/**
 * @param {StoreState} storeState
 * @returns {(appSettings: AppSettings) => AppSettings}
 */
export default (storeState: StoreState): Subset<AppSettings> => {
  const institutionSettings = storeState.institutes.reduce(
    (all: Subset<AppSettings>, institution) => {
      return {
        ...all,
        autoRedirect: all.autoRedirect || institution.defaultSettings.autoRedirect.value,
        showTimer: all.showTimer || institution.defaultSettings.showTimer.value,
        alternatives: alternativeSettings(all, institution),
        integrations: integrations(all.integrations || {}, institution),
        customizations: all.customizations || institution.general_customization,
        fabPosition: institution.modules_enabled.futures
          ? FloatingActionPosition.BottomRight : FloatingActionPosition.Off,
        sciwheelEnabled: institution.featureFlags.sciwheel && institution.modules_enabled.sciwheel,
        logging_enabled: all.logging_enabled || institution.logging_enabled,
        // reset to 0 when Institution selection has been updated
        recentLibrarySearch: 0,
      };
    },
    {},
  );

  const packages = storeState.keywordPackages.map(({ uuid }) => [uuid, true]);
  const hasJournalAlertsEnabled = storeState.institutes.some(({ journal_alerts }) => journal_alerts.access);
  return merge({
    ...institutionSettings,
    journalAlerts: hasJournalAlertsEnabled,
    journalAlertsInstitution: hasJournalAlertsEnabled,
    onCampus: Object.values(storeState.onCampus).some(Boolean),
    keywordEnhancements: {
      enabled: !!storeState.keywordPackages.length,
      packages: Object.fromEntries(packages),
    },
  });
};
