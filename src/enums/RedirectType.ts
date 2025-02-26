/**
 * We have different types of redirects i.e.
 * - Custom                         - a redirect from an institution when a user hits a specific URL.
 * - Auto                           - a shortcut for 'Access' that redirects the user to the Authentication provider's
 *                                    login page automatically.
 * - SearchEnhancedPubMed           - When a user lands on PubMed and their institution has a subscription.
 * - SearchEnhancedGoogleScholar    - When a user lands on Google Scholar and their institution has a subscription.
 */
enum RedirectType {
  Auto = 'auto',
  Custom = 'custom',
  SearchEnhancedPubMed = 'pubMed',
  SearchEnhancedGoogleScholar = 'googleScholar',
  RedirectLoop = 'redirectLoop',
}

export default RedirectType;
