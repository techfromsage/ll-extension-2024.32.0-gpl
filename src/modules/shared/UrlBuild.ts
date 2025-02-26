type AllowedParams = string | boolean | number | undefined;

interface Params {
  [key: string]: AllowedParams,
}
/**
 * Takes a baseUrl and a param object of key/values and generates a new url with
 * the params added as url search parameters
 *
 * @param  {string} baseUrl
 * @param  {Params} params
 */
const UrlBuild = (baseUrl: string, params: Params) => ({
  generate: () => {
    if (!Object.keys(params).length) {
      return baseUrl;
    }

    const searchParams = Object
      .entries(params)
      .map(([key, value]) => (value ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}` : ''))
      .filter(Boolean)
      .join('&');

    return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${searchParams}`;
  },
});

export default UrlBuild;
