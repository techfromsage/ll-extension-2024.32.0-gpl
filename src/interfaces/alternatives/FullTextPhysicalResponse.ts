/**
 * Interface FullTextPhysicalResponse represents the JSON response from the API holdingInformation
 * endpoint when searching for physical library items.
 */

export interface PrintHolding {
  identifier: string,
  found: boolean,
}
interface FullTextPhysicalResponse {
  [printHoldings: string]: [
    PrintHolding,
  ],
}

export default FullTextPhysicalResponse;
