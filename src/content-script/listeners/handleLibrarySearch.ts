import { FeaturesDetermined } from '@/interfaces/browser/AppMethods';
import Feature from '@/enums/Feature';
import State from '@/enums/State';
import Platform from '@/interfaces/Platform';
import createShadowLibrarySearch, { destroyShadowLibrarySearch } from '@/components/Shadow/createShadowLibrarySearch';

/**
 * handleLibrarySearch
 */
export default (platform: Platform, url: URL) =>
  async (features: FeaturesDetermined): Promise<FeaturesDetermined> => {
    const { featureValues, knowledgeBases } = features;
    const librarySearchSupported = featureValues[Feature.LibrarySearch] === State.Supported;

    if (!librarySearchSupported) {
      destroyShadowLibrarySearch();
      return features;
    }

    createShadowLibrarySearch(platform, knowledgeBases, url);

    return features;
  };
