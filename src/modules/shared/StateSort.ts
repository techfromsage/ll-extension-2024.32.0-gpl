/**
 * Sort function for App state.
 * Given an array of objects with "state" property and a "sorting array" of State strings,
 * sort the by the objects based on the order of the "sorting array".
 *
 * This is ued to determine what order to show features.
 * (e.g. Alternatives - ebook, Alternatives - open access, Access etc..) to users.
 */
import State from '@/enums/State';

export interface WithState {
  state?: State,
  target?: State,
}

/**
 * Checks if two states are in a sorting array.
 *
 * @param sortingArray
 * @param stateA
 * @param stateB
 */
const inSortingArray = (sortingArray: State[], stateA: State, stateB: State): boolean =>
  sortingArray.includes(stateA) && sortingArray.includes(stateB);

/**
 * @param sortingArray
 * @param propertyToSortBy
 * @param filter by default we want to filter out any items that are not in the sorting array.
 *
 * @returns {(a: WithState, b: WithState) => number}
 */
export default <T extends WithState>(sortingArray: State[], propertyToSortBy: keyof WithState, filter = true): (
  a: T,
  b: T) => number => {
  return (a, b): number => {
    // If we want to keep all values that are not in the sorting array, then return 0
    if (!filter && !inSortingArray(sortingArray, a[propertyToSortBy] as State, b[propertyToSortBy] as State)) {
      return 0;
    }
    return sortingArray.indexOf(a[propertyToSortBy] as State) - sortingArray.indexOf(b[propertyToSortBy] as State);
  };
};
