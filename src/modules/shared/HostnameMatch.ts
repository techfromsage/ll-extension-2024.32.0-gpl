/**
 * Simple hostname matching either strictly or loosely.
 * - Strict: does hostname A === hostname B
 * - Loose: does hostname A end with hostname B
 */

interface SimpleDomain {
  domain: string,
  strict: boolean,
}

export default (baseHostname: string) => ({
  match: (domain: SimpleDomain) => {
    if (!domain.domain.length) {
      return false;
    }
    return domain.strict
      ? baseHostname === domain.domain
      : `.${baseHostname}`.endsWith(`.${domain.domain}`);
  },
});
