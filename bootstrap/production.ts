/**
 * production
 */
import { BootstrapConfig } from '@/interfaces/Config';

const production: BootstrapConfig = {
  environment: 'production',
  datadog: {
    clientToken: 'pubabfe25513e99d4fc1cafb9a659ae1ec9',
    rumApplicationId: 'd61017e3-fb73-418c-be1a-ac5428698532',
    rumClientToken: 'pub9387e53f5878514c078da2a3943e20c4',
    service: 'project-cheddar_web-clients_app-extension',
    site: 'datadoghq.eu',
  },
  sentry: {
    dsn: 'https://87212a480dd645bda0f7e356d7df08ae@o538367.ingest.sentry.io/4505322960453632',
  },
  api: {
    institutionList: 'https://cdn.leanlibrary.app/data/institutions.json',
    configUrl: 'https://cdn.leanlibrary.app/data/config.json',
    institute: 'https://api.leanlibrary.com?r=api/api/institute&instituteId=',
    instituteSettings: 'https://cdn.leanlibrary.app/data/institutions/{instituteId}/settings.json',
    customMessages: 'https://cdn.leanlibrary.app/data/institutions/{instituteId}/assist-messages.json',
    resourceDomains: 'https://cdn.leanlibrary.app/data/institutions/{instituteId}/resource-domains.json',
    customRedirects: 'https://cdn.leanlibrary.app/data/institutions/{instituteId}/custom-redirects.json',
    deniedDomains: 'https://api.leanlibrary.com?r=api/api/blacklistedDomains&version=2&instituteId=',
    llaEvent: 'https://app.leanlibrary.com/index.php?r=api/api/logAction',
    ip: 'https://app.leanlibrary.com/?r=api/api/getIp',
    defaultInstitution: 'https://api.leanlibrary.app/institutions/default/{ip}',
    search: 'https://search.leanlibrary.com',
    globalDeny: 'https://cdn.leanlibrary.app/data/config/global-denylist.json',
    uninstallUrl: 'https://app.leanlibrary.com?r=api/api/uninstallExtension',
    tocAlerts: {
      issnCheckUrl: 'https://app2.leanlibrary.com/api/extension/journal-alert/issn-check?id={instituteId}&issn={issn}',
      buttonUrl: 'https://app2.leanlibrary.com/{issn}/subscribers/create/{instituteId}',
    },
    libraryResources: 'https://cdn.leanlibrary.app/data/institutions/{instituteId}/resources.json',
    libraryResource: 'https://cdn.leanlibrary.app/data/resources/{type}/{uuid}.json',
    librarySearch: 'https://cdn.leanlibrary.app/data/institutions/{instituteId}/library-search.json',
    isbnMetadata: 'https://api.leanlibrary.app/metadata/isbns/{isbns}',
    campaignItem: 'https://cdn.leanlibrary.app/data/campaigns/{uuid}.json',
    citation: {
      styles: 'https://cdn.leanlibrary.app/data/institutions/{instituteId}/citation-styles.json',
      format: 'https://api.leanlibrary.app/institutions/{instituteId}/format-citations',
    },
    keywordEnhancements: 'https://cdn.leanlibrary.app/data/institutions/{instituteId}/keyword-enhancements.json',
    openAccess: {
      core: 'https://api.core.ac.uk/v3/discover',
      coreApiKey: '',
    },
    llApi: {
      url: 'https://api.leanlibrary.app',
      token: '',
    },
    translations: 'https://cdn.leanlibrary.app/data/institutions/{instituteId}/translations.json',
    scite: {
      tallies: 'https://api.scite.ai/tallies',
      papers: 'https://api.scite.ai/papers',
    },
    sciwheel: {
      base: 'https://sciwheel.com',
      authentication: 'https://sciwheel.com/annotator/signed_in',
      logOut: 'https://sciwheel.com/annotator/logout',
      signOut: 'https://sciwheel.com/newapi/signout',
      projects: 'https://sciwheel.com/newapi/annotator/collections',
      importIds: 'https://sciwheel.com/newapi/annotator/importIds?collectionId={project}',
      usersSavedArticles: 'https://sciwheel.com/work/api/search/items',
      annotations: 'https://sciwheel.com/newapi/annotator/annotations',
      fetchAnnotations: 'https://sciwheel.com/newapi/annotator/find',
      canCreateProject: 'https://sciwheel.com/newapi/annotator/collections/can-create',
      addNewProject: 'https://sciwheel.com/newapi/annotator/collection/create?name={projectName}',
      viewLibraryItem: 'https://sciwheel.com/work/#/items/{libraryItemId}',
    },
    printHoldings: 'https://api.leanlibrary.app/institutions/{instituteId}/print-holdings/{isbn}',
  },
  leanlibraryOpenId: '378',
  searchResultsLimit: 15,
  onCampusCheckInterval: 120000,
};

export default production;
