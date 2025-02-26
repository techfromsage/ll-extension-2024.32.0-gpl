/**
 * Interface modules enabled represents the different modules that an institution has access to.
 */

interface ModulesEnabled {
  access: boolean,
  alternatives: boolean,
  assist: boolean,
  journal_alert: boolean,
  futures: boolean,
  onboarding: boolean,
  service_desk: boolean,
  faq: boolean,
  survey: boolean,
  libchat: boolean,
  nps: boolean,
  keyword_enhancement: boolean,
  library_search: boolean,
  citations: boolean,
  sciwheel: boolean,
}

export default ModulesEnabled;
