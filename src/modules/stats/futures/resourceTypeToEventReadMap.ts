import LibraryResourceType from '@/enums/futures/LibraryResourceType';
import FuturesStatType from '@/enums/FuturesStatType';

/**
 * resourceTypeToEventReadMap given a Futures' resource type,
 * get the corresponding Read event type.
 * @param resourceType
 */
export default (resourceType?: LibraryResourceType) => {
  switch (resourceType) {
    case LibraryResourceType.Onboarding:
      return FuturesStatType.OnboardingMarkAsRead;
    case LibraryResourceType.Survey:
      return FuturesStatType.SurveyMarkAsRead;
    default:
      return null;
  }
};
