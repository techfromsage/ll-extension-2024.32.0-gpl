/**
 * Extracts Sharepoint results from a Sharepoint response.
 * As Sharepoint payload is huge and complex. This function extracts the data in a more developer friendly way
 * but providing a key value pair out for each result. e.g.:
 *
 * [
 *   {
 *     Value: 'Dave Grohl',
 *     ValueType: 'Edm.String',
 *     Key: 'Author',
 *   },
 *   {
 *     Value: 'The Color and The Shape',
 *     ValueType: 'Edm.String',
 *     Key: 'Title',
 *   },
 * ]
 *
 * becomes:
 *
 * {
 *   Author: 'Dave Grohl',
 *   Title: 'The Color and The Shape',
 * }
 */
import ProviderResponseSharepoint, {
  ResponseSharepointResult,
  SharepointValueType,
} from '@/interfaces/librarySearches/sharepoint/ProviderResponseSharepoint';

/**
 * Parses the string value to its corresponding type in JavaScript.
 *
 * e.g. for a result
 * {
 *   Value: '12345',
 *   ValueType: 'Edm.Int64',
 *   Key: 'DocId',
 * }
 *
 * return the number 12345.
 *
 * @param {string | null} value
 * @param {SharepointValueType} type
 * @returns {number | string | null}
 */
const parseValue = (value: string | null, type: SharepointValueType) => {
  if (type === SharepointValueType.Number) {
    return parseInt(value as string, 10);
  }
  return value;
};

/**
 * Converts the array of key value pairs into a single key value pair object.
 * A seen in the example at top of this page.
 *
 * @param {Record<string, any>} all
 * @param {ResponseSharepointResult} entry
 * @returns Record<string, any>
 */
const reduceToKeyValuePair = (all: Record<string, any>, entry: ResponseSharepointResult) =>
  ({ ...all, [entry.Key]: parseValue(entry.Value, entry.ValueType) });

export default (response: ProviderResponseSharepoint): Record<string, any>[] =>
  response.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results
    .map(row => row.Cells.results.reduce(reduceToKeyValuePair, {}));
