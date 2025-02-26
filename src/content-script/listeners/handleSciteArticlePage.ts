/**
 * Handles embedding scite on pages with valid DOI
 */
import { FeaturesDetermined } from '@/interfaces/browser/AppMethods';
import { Config } from '@/interfaces/Config';
import Feature from '@/enums/Feature';
import State from '@/enums/State';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import DoiMatch from '@/modules/alternatives/doi/DoiMatch';
import sciteShadowElement from '@/components/Scite/sciteShadowElement';
import eventClickBadges from '@/modules/stats/access/eventClickBadges';
import eventAddBadges from '@/modules/stats/access/eventAddBadges';
import { StoreState } from '@/store';
import fetchSciteTallies from '@/content-script/listeners/fetchSciteTallies';
import fetchSciteNotices from '@/content-script/listeners/fetchSciteNotices';

/**
 * @param {Config} config
 * @param {DigitalResource[]} resources
 * @param url
 * @returns {(features: FeaturesDetermined) => Promise<FeaturesDetermined>}
 */
export default (config: Config, resources: DigitalResource[], storeState: {
  appActive: StoreState['appActive'],
  institutes: StoreState['institutes'],
  appSettings: StoreState['appSettings'],
}): (features: FeaturesDetermined) =>
  Promise<FeaturesDetermined> =>
  async (features: FeaturesDetermined) => {
    const { featureValues } = features;
    const sciteSupported = featureValues[Feature.Scite] === State.SciteOnPublisherWebsiteSupported;

    if (!sciteSupported) {
      return features;
    }

    // At this point we know a Scite badge is supported, so we load it.
    const resource = resources.find(({ metadata }) => !!DoiMatch.all(metadata?.doi || '').length);
    const sciteInstitute = storeState.institutes.find(({ scite: { enabled } }) => enabled);

    if (!resource?.metadata?.doi || !sciteInstitute) {
      return features;
    }

    const response = await fetchSciteTallies(config, [resource.metadata.doi]);
    const notices = await fetchSciteNotices(config, [resource.metadata.doi]);
    const { appSettings: { integrations: { scite } } } = storeState;

    if (response.tallies) {
      sciteShadowElement({
        tally: response.tallies[resource.metadata.doi],
        notices: notices.notices[resource.metadata.doi],
        layout: 'vertical',
        showZero: false,
        clickHandler: () => eventClickBadges(sciteInstitute.id),
        key: 'ArticlePage',
        element: document.body,
        enabled: storeState.appActive && scite.enabled && scite.elsewhere,
      });

      eventAddBadges(sciteInstitute.id, [resource.identifier]);
    }

    return features;
  };
