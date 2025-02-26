import State from '@/enums/State';
import PhysicalResource from './PhysicalResource';

interface PhysicalResourcesResults {
  urls: () => Promise<PhysicalResource[]>,
  state: State,
}

export default PhysicalResourcesResults;
