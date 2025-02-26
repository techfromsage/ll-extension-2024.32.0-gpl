/**
 * Interface LibraryResource represents processed "LibraryResource" data that
 * will be displayed in a libraryResources/popup.
 * i.e. The institution has been added, as well as the shown/read flags
 */

import Institution from '@/interfaces/Institution';
import LibraryResourceFrequency from '@/enums/futures/LibraryResourceFrequency';
import LibraryResourceType from '@/enums/futures/LibraryResourceType';
import ContentType from '@/enums/futures/ContentType';
import PopupType from '@/enums/futures/PopupType';
import Language from '@/enums/Language';

interface LibraryResource {
  frequency?: LibraryResourceFrequency,
  uuid: string,
  title: string,
  triggerUrls: string[],
  contentType: ContentType,
  type: LibraryResourceType,
  shown: boolean,
  read: boolean,
  institution: Institution,
  lang: Language,
  popupType: PopupType,
}

export default LibraryResource;
