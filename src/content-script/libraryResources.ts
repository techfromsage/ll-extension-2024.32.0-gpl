/**
 * Provides Library resources (surveys, onboarding etc...) objects that available for the current page
 **
 * for more product documentation.
 *
 */
import LibraryResourcePayload from '@/interfaces/libraryResources/LibraryResourcePayload';
import Institution from '@/interfaces/Institution';
import LibraryResources from '@/modules/libraryResources/LibraryResources';
import LibraryResource from '@/interfaces/libraryResources/LibraryResource';

export default (url: URL, libraryResourcePayloads: LibraryResourcePayload[], institutions: Institution[]): LibraryResource[] =>
  LibraryResources(url, libraryResourcePayloads, institutions);
