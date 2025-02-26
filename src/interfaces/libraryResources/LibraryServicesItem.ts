/**
 * Interface LibraryServicesItem provide a structure for passing library service links to the UI.
 */
import State from '@/enums/State';
import Feature from '@/enums/Feature';
import Institution from '@/interfaces/Institution';
import LibraryResourceType from '@/enums/futures/LibraryResourceType';

interface LibraryServicesItem {
  id: string,
  institution: Institution,
  state: State,
  feature: Feature,
  libraryResourceType?: LibraryResourceType,
}

export default LibraryServicesItem;
