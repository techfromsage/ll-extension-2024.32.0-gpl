import State from '@/enums/State';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import DigitalResourcesURLs from '@/interfaces/alternatives/DigitalResourcesURLs';
import Institution from '@/interfaces/Institution';
import UrlBuild from '@/modules/shared/UrlBuild';
import ReplacedKeys from '@/modules/alternatives/ReplacedKeys';
import { CombinedMetadata } from '@/modules/referenceManager/CombinedMetadata';

/**
 * Builds an order form url
 * If the institution has it enabled, with custom search params to generate a pre-filled form
 */
const DoiOrderForm = (
  orderForm: Institution['alternatives']['orderForm'],
  resource: DigitalResource,
  institution: Institution,
): DigitalResourcesURLs => {
  const generate = (): string => {
    // this should never happen, the backend / admin dashboard should be handling this edge case
    if (!orderForm.url) {
      throw new Error('Institution has enabled orderForm but hasn\'t provided an orderForm URL');
    }

    if (!orderForm.params) {
      return orderForm.url;
    }

    const metadata = {
      ...CombinedMetadata(resource),
      ...resource.metadata,
    };

    const params = ReplacedKeys(metadata, orderForm.params);
    return UrlBuild(orderForm.url, params).generate();
  };

  return {
    urls: () => Promise.resolve([{
      ...resource,
      urls: [generate()],
      institution,
      state: State.OrderForm,
    }]),
    state: State.OrderForm,
  };
};

export default DoiOrderForm;
