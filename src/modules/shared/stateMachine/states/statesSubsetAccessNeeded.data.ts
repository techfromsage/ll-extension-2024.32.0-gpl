import State from '@/enums/State';

/**
 * This is used to sort a specific scenario where the user has access to the DOI (alternatives) BUT
 * also access/login to the resource domain (access).
 * In the case of an institution with openAccess.accessPossiblePopupsEnabled, we want to promote Access popup over Alternatives.
 */
export default [
  State.ProxyAccessPossible,
  State.OpenAthensAccessPossible,
  State.ShibbolethAccessPossible,
  State.ProxyAccessAchieved,
  State.OpenAthensAccessAchieved,
  State.ShibbolethAccessAchieved,
  // Alternatives
  State.FullTextFinderAchieved,
  State.OpenAccessAchieved,
  State.EbookFinderAchieved,
];
