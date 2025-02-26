/**
 * Interface DigitalResourcesURLs provides a mechanism to request the URLS for digital resources
 * from external data sources such as Core, or the Institution's Holdings system.
 * Standardising this allows us to batch up requests and request one at a time until we get some results.
 *
 * We also track "State" here in order to prioritise requests e.g. OpenAccess before Holdings system.
 *
 * @see Alternatives.ts
 *
 */
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import State from '@/enums/State';

interface DigitalResourcesURLs {
  urls: () => Promise<DigitalResource[]>,
  state: State,
}

export default DigitalResourcesURLs;
