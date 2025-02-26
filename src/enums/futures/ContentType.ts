/**
 * ContentType is used to represent the type of content that might be within a LibraryResource or Modal
 */

export enum ContentType {
  Link = 'link',
  HTML = 'html',
  iFrame = 'iframe',
  ScriptBased = 'script-based',
  UrlBased = 'url-based',
}

export default ContentType;
