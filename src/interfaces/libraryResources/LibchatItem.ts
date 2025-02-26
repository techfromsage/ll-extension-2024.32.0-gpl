import LibraryResourceType from '@/enums/futures/LibraryResourceType';
import ContentType from '@/enums/futures/ContentType';

/**
 * A libraryResources libchat item response.
 */
type LibchatItem = {
  uuid: string,
  name: string,
  type: LibraryResourceType,
  contentType: ContentType,
  url: string,
  headerScript: string | null,
  bodyScript: string | null,
  viewMethod: string | null,
  htmlContainer: string | null,
  height: number,
  width: number,
};

export default LibchatItem;
