/**
 * The different "types" a result can be as provided in the API
 */
export enum SharepointValueType {
  String = 'Edm.String',
  Number = 'Edm.Int64',
}

/**
 * A single property e.g. Title
 * {
 *   Key: 'Title',
 *   Value: 'Monkey Wrench',
 *   ValueType: 'Edm.String',
 * }
 */
export interface ResponseSharepointResult {
  Key: string,
  Value: string | null,
  ValueType: SharepointValueType,
}

interface ResponseSharepointRow {
  Cells: {
    results: ResponseSharepointResult[],
  },
}

/**
 * Interface ProviderResponseSharepoint represents the payload that comes back from
 * the Sharepoint Rest API.
 */
interface ProviderResponseSharepoint {
  d: {
    query: {
      PrimaryQueryResult: {
        RelevantResults: {
          Table: {
            Rows: {
              results: ResponseSharepointRow[],
            },
          },
        },
      },
    },
  },
}

export default ProviderResponseSharepoint;
