import { Config } from '@/interfaces/Config';
import browserMethods from '@/browserMethods';
import { SciteTalliesResponse } from '@/interfaces/scite/SciteTalliesResponse';

/**
 * For a given set of dois, fetch its scite.ai metadata from their API.
 */
export default (config: Config, dois: string[]): Promise<SciteTalliesResponse> => {
  const { httpRequest } = browserMethods.app.contentScript;
  return httpRequest<SciteTalliesResponse>({
    method: 'post',
    url: config.api.scite.tallies,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dois),
  });
};
