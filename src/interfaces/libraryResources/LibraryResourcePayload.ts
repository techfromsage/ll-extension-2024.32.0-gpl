/**
 * Interface LibraryResource represents a Futures module that
 * will be displayed in a modal/popup.
 */

import LibraryResourceFrequency from '@/enums/futures/LibraryResourceFrequency';
import LibraryResourceType from '@/enums/futures/LibraryResourceType';
import ContentType from '@/enums/futures/ContentType';
import PopupType from '@/enums/futures/PopupType';
import Language from '@/enums/Language';

type LibraryResourcePayload = {
  uuid: string,
  type: LibraryResourceType,
  institution: string,
  triggerUrls: string[],
  contentType: ContentType,
  title: string,
  frequency: LibraryResourceFrequency,
  lang: Language,
  popupType: PopupType,
  courseCode?: string,
};

export default LibraryResourcePayload;
