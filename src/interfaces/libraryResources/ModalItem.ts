import LibraryResourceType from '@/enums/futures/LibraryResourceType';
import LibraryResourceFrequency from '@/enums/futures/LibraryResourceFrequency';
import ContentType from '@/enums/futures/ContentType';
import PopupType from '@/enums/futures/PopupType';

/**
 * A libraryResources item response.
 */
type ModalItem = {
  uuid: string,
  title: string,
  type: LibraryResourceType,
  institution: string,
  content: string,
  contentType: ContentType,
  frequency?: LibraryResourceFrequency,
  popupType: PopupType,
};

export default ModalItem;
