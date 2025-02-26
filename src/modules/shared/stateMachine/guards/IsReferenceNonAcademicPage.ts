/**
 * Checks if the reference manager is in single page mode.
 *
 * Relating to: ReferenceManager
 */

import ReferenceManagerContext from '@/interfaces/stateMachine/ReferenceManagerContext';

export default (context: ReferenceManagerContext): boolean => {
  return !!context.resources.nonAcademicResources.length;
};
