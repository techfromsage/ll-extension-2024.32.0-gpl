import InstitutionItems from '@/interfaces/InstitutionItems';
import State from '@/enums/State';

/**
 * Checks if a specific state is allowed for an institution.
 *
 * @param {string | undefined} institution
 * @param {State} stateToCheck
 * @param {InstitutionItems<State>} allowedStates
 * @returns {boolean}
 */
export default (institution: string | undefined, stateToCheck: State, allowedStates: InstitutionItems<State>) => {
  if (!institution) {
    return false;
  }
  return allowedStates[institution].includes(stateToCheck);
};
