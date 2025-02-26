export type AuthenticationScraper = {
  domain: string,
  xpath: string,
};
/**
 * Specific scrapers for authentication. This is useful for when the other method of determining
 * if a user is logged in is not possible.
 * i.e. oed.com now no longer rewrites the URL to a proxy URL when logged in.
 */
const authenticationScraper: AuthenticationScraper[] = [
  {
    domain: 'oed.com',
    xpath: '//*[@id="signedInAs"]',
  },
  {
    domain: 'www.oed.com',
    xpath: '//*[@id="signedInAs"]',
  },
];

export default authenticationScraper;
