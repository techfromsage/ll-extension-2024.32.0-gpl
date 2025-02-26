import camelCase from 'lodash.camelcase';
import CleanObject from '@/modules/shared/CleanObject';

interface Keys {
  [key: string]: any,
}

/**
 * ReplaceKeys replaces the keys for an object with new keys provided by another object.
 * For example, passing in the `values` objects:
 * {
 *   id: '123',
 *   title: 'A great new book'
 * }
 * With the `newKeys` object:
 * {
 *   id: 'myId',
 *   title: 'myTitle'
 * }
 *
 * Would return:
 * {
 *   myId: '123',
 *   myTitle: 'A great new book'
 * }
 *
 * @param {object} values
 * @param {object} newKeys
 * @returns {object}
 * @constructor
 */
const ReplacedKeys = (values: any, newKeys: any): Keys => {
  if (!newKeys) {
    return values;
  }

  if (!values) {
    return {};
  }

  return CleanObject(
    Object.keys(newKeys).reduce((all, key) => ({
      ...all,
      [newKeys[key]]: values?.[camelCase(key)],
    }), {}),
  );
};

export default ReplacedKeys;
