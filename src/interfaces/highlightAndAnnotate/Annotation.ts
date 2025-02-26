export interface Range {
  start: string,
  end: string,
  startOffset: number,
  endOffset: number,
}

export interface DeserializedRange {
  anchorNodeParent: Element | null,
  anchorOffset: number,
  focusNodeParent: Element | null,
  focusOffset: number,
}

interface Author {
  id:string,
  firstName: string,
  lastName: string,
  apiToken: string | null,
  hasValidWorkbenchSubscription?: boolean,
  hasTrialAccess: boolean,
  hasAnyAnnotations: boolean,
  primeContributor: boolean,
  workbenchBeta: boolean,
  deleted: boolean,
}

interface Annotation {
  id: string,
  idInfo: string | null,
  articleId: string | null,
  libraryItemId: string,
  inSameDomain: boolean,
  images: string[],
  quote: string,
  quoteContext: string,
  author: Author,
  type?: string,
  comments: string[],
  ranges: Range[],
  color: string,
  text: string,
  created: number,
  updated: number | null,
  uri: string | null,
}

export default Annotation;
