/**
 * Interface SearchEnhancer represents the specific search enhancement
 * config from an institution API.
 */
import LocationOption from '@/enums/LocationOption';
import RedirectType from '@/enums/RedirectType';

interface SearchEnhancer {
  type: RedirectType,
  domain: string, // RegExp
  redirectOption: LocationOption,
  redirectOnce: boolean,
  parameters: {
    [name: string]: string,
  },
}

export default SearchEnhancer;
