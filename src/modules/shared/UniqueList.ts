import uniqBy from 'lodash.uniqby';

/**
 * Provides a unique list of items based on the key provided.
 * This is currently just a wrapper for lodash.uniqBy but allows us to
 * decouple the usage of lodash from the rest of the codebase.
 */
export default <Items>(items: Items[], key: string) => {
  return uniqBy(items, key);
};
