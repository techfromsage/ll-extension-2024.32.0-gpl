/**
 * Interface CustomRedirect represents a URL redirect the institution has set up to redirect from one URL
 * to another. e.g.:
 * ```
 * {
 *    "urlFrom":"https://stanford.naxosmusiclibrary.com/login/notauthorized.asp",
 *    "urlTo":"https://stanford.idm.oclc.org/login?url=https://stanford.naxosmusiclibrary.com/"
 * }
 * ```
 *
 * This is sent through from the customRedirects endpoint.
 */

interface CustomRedirect {
  urlFrom: string,
  urlTo: string,
  institution: string,
}

export default CustomRedirect;
