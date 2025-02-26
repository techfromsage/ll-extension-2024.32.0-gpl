import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import Institution from '@/interfaces/Institution';
import State from '@/enums/State';

/**
 * Checks if Access is needed before an Alternative can be found.
 *
 * @param context
 * @constructor
 */
export default (context: FeaturesContext) => {
  const [alternative] = context.alternativeURLs;
  if (!alternative) {
    return false;
  }

  const institution = alternative.institution as Institution;
  // Institution does not want to prioritize accessPossible
  if (alternative.state === State.OpenAccess && !institution.alternatives.openAccess.accessPossiblePopupsEnabled) {
    return false;
  }

  return context.accessConnections.some(({ resource }) => resource);
};
