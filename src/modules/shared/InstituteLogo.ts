import Institution from '@/interfaces/Institution';
import browserMethods from '@/browserMethods';
import placeholderLogo from '@/assets/svg/placeholderLogo.svg';

export default (institution?: Institution): string =>
  institution?.general_customization?.logo // general customization logo
  || institution?.styling.logo // "old" Insyde logo
  || browserMethods.runtime.getURL(placeholderLogo); // fallback to our placeholder logo
