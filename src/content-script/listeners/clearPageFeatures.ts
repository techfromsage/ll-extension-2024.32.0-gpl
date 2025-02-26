import { destroyShadowLibrarySearch } from '@/components/Shadow/createShadowLibrarySearch';
import RemoveSciteBadges from '@/modules/scite/RemoveSciteBadges';
import { destroyShadowKeywordEnhancementsContainer } from '@/components/Shadow/createShadowKeywordEnhancementsContainer';
import { destroyShadowHighlightAndAnnotateContainer } from '@/components/Shadow/createShadowHighlightAndAnnotateContainer';
import { destroyTocAlerts } from './handleTocButtons';

const clearPageFeatures = () => {
  RemoveSciteBadges(document);
  destroyShadowLibrarySearch();
  destroyTocAlerts();
  destroyShadowKeywordEnhancementsContainer();
  destroyShadowHighlightAndAnnotateContainer();
};

export default clearPageFeatures;
