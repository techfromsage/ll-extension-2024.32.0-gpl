/**
 * Gets the current Public IP of the client.
 * This is most accurately done by make a Server Side request and returning the Header IP address from
 * that request.
 *
 * @param url The URL if the IP service
 * @constructor
 */
import FetchClient from '@/interfaces/http/FetchClient';

interface IPLookupResponse {
  ip: string,
}

const CurrentIp = (url: string, httpClient: FetchClient): Promise<string> =>
  httpClient
    .get<IPLookupResponse>(url)
    .then(json => json.ip)
    .catch(_ => '');

export default CurrentIp;
