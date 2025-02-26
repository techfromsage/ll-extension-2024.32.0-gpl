import LibraryResourceType from '@/enums/futures/LibraryResourceType';
import FuturesStatType from '@/enums/FuturesStatType';

/**
 * resourceTypeToEventShownMap given a Futures' resource type,
 * get the corresponding Shown event type.
 * @param resourceType
 */
export default (resourceType?: LibraryResourceType) => {
  switch (resourceType) {
    case LibraryResourceType.Onboarding:
      return FuturesStatType.OnboardingShown;
    case LibraryResourceType.Campaign:
      return FuturesStatType.CampaignShown;
    case LibraryResourceType.Survey:
      return FuturesStatType.SurveyShown;
    case LibraryResourceType.Faq:
      return FuturesStatType.FaqShown;
    default:
      return null;
  }
};
