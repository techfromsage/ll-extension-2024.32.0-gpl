/**
 * Interface Translation represents the data structure for an Institution's translation.
*/
import { ContentConfig } from './Config';

interface Translation {
  primaryLang: string,
  primaryLangFlag: string,
  secondaryLang: string,
  secondaryLangFlag: string,
  [key: string]: string | Partial<ContentConfig>,
}

export default Translation;
