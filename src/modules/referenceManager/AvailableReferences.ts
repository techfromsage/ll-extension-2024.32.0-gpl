import uniqBy from 'lodash.uniqby';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';

/**
 * Provides digital resources that are available to be referenced by
 * filtering out resources without a DOI and removes duplicates.
 */
export default (resources: DigitalResource[]) => {
  return uniqBy(
    resources.filter(resource =>
      resource.urls.length
      || resource.scrapedMetadata?.doi
      || resource.metadata?.doi
      || resource.metadata?.openAccessUrls?.length),
    'identifier',
  );
};
