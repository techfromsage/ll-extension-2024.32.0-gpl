/**
 * Checks if the reference manager is in search results page mode.
 *
 * Relating to: ReferenceManager
 */

import ReferenceManagerContext from '@/interfaces/stateMachine/ReferenceManagerContext';

export default (context: ReferenceManagerContext): boolean => {
  // no results or just 1 result, not search page
  if (!context.resources.digitalResources.length || context.resources.digitalResources.length === 1) {
    return false;
  }

  // presume search results page if they are all the same scraperType and return true
  return context.resources.digitalResources.every((resource, index, resources) =>
    resource.scraperType === resources[0].scraperType);
};
