/**
 * Removes null, undefined, empty arrays, and empty objects from the given object.
 *
 * @param obj - The object to clean.
 * @returns A new object with the same properties as the input object, without falsy values
 *
 * @template T - The type of the input object.
 */
const CleanObject = <T extends object>(obj: T) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) =>
    v !== null
    && v !== undefined
    && !(Array.isArray(v) && v.length === 0)
    && !(typeof v === 'object' && Object.keys(v).length === 0)));

export default CleanObject;
