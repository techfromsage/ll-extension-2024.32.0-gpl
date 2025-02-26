import { StoreState } from '@/store';
import FuturesStatType from '@/enums/FuturesStatType';
import { EventWithMetadata } from '@/store/shared/stats/stats';
import OnboardingCourse from '@/enums/OnboardingCourse';
import StatFutures from '@/interfaces/StatEventsFutures';

/**
 * Detects if the URL contains a course id and event type and sends a stat event to the futures API.
 */
export default (
  url: URL,
  state: StoreState,
  pushStatEventFutures: (statEvent: EventWithMetadata<StatFutures>) => void,
) => {
  const courseId = url.searchParams.get(OnboardingCourse.CourseId);
  const eventType = url.searchParams.get(OnboardingCourse.EventType);

  if (!courseId || eventType !== FuturesStatType.CourseCompleted) {
    return;
  }

  const onboardingCourse = state.libraryResources.find(resource => resource.courseCode === courseId);
  if (!onboardingCourse) {
    return;
  }

  pushStatEventFutures({
    type: FuturesStatType.CourseCompleted,
    course_id: courseId,
    institute_id: onboardingCourse.institution,
    module_uuid: onboardingCourse.uuid,
    uuid: state.clientId,
    limit: 1,
  });
};
