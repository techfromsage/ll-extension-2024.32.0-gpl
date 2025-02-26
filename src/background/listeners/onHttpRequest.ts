import { HTTPRequestOptions } from '@/interfaces/browser/AppMethods';
import HTTPClient from '@/modules/shared/http/HTTPClient';

/**
 * onHttpRequest makes a generic HTTP request via the background.
 */
export default ({ method, url, ...options }: HTTPRequestOptions) => HTTPClient[method](url, options);
