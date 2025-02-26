/**
 * Checks if the reference manager is in single page mode.
 *
 * Relating to: ReferenceManager
 */

import ReferenceManagerContext from '@/interfaces/stateMachine/ReferenceManagerContext';

export default (context: ReferenceManagerContext): boolean => {
  // no results, not single page
  if (!context.resources.digitalResources.length) {
    return false;
  }

  // 1 result, must be single page
  if (context.resources.digitalResources.length === 1) {
    return true;
  }

  // presume single page if 1 is a different scraperType and return true
  return !context.resources.digitalResources.every((resource, index, resources) =>
    resource.scraperType === resources[0].scraperType);
};
