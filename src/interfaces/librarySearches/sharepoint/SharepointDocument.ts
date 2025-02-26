type SharepointDocument = {
  DocId: number,
  Title: string,
  Path: string,
  Author: string,
  FileExtension: string,
  Description: string | null,
  Write: string | null,
  HitHighlightedSummary: string | null,
};

export default SharepointDocument;
