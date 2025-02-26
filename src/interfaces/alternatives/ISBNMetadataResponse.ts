/**
 * Interface ISBNMetadataResponse represents the JSON response from the API metadata relatedIsbns
 */
export interface ISBNMetadataResponse {
  metadata: ISBNMetadataItem[],
}

export interface ISBNMetadataItem {
  id: string,
  relatedIsbns: string[],
  title?: string,
  authorsSplit?: string[],
  authors?: string,
}
