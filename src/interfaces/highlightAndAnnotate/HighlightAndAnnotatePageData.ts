interface HighlightAndAnnotatePageData {
  id?: string,
  color: string,
  page: {
    uri: string,
    title: string,
  },
  selection: {
    text?: string,
    quote?: string,
    quoteContext?: string,
    ranges?: {
      start: string,
      startOffset: number,
      end: string,
      endOffset: number,
    }[],
    images?: { src: string, full: string }[],
  },
}

export default HighlightAndAnnotatePageData;
