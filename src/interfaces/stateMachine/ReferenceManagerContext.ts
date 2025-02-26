import { StoreState } from '@/store';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import NonAcademicResource from '@/interfaces/sciwheel/NonAcademicResource';

interface ReferenceManagerContext {
  storeState: {
    user: StoreState['user'],
    referenceDenyList: StoreState['referenceDenyList'],
    appSettings: StoreState['appSettings'],
    config: StoreState['config'],
  },
  resources: {
    digitalResources: DigitalResource[],
    nonAcademicResources: NonAcademicResource[],
    citedArticles: DigitalResource[],
  },
  currentLocation: Location,
  // used for "forcing" a single resource to be cited, eg from a google scholar search page citation button
  referenceResource: DigitalResource | undefined,
}

export default ReferenceManagerContext;
