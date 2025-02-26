/**
 * Standardised Tallies API response.
 */
type ScitePapersItem = {
  id: number,
  doi: string,
  slug: string,
  type: string,
  title: string,
  abstract: string,
  authors: {
    family: string,
    given: string,
    affiliation: string,
    authorSlug: string,
    authorName: string,
    authorID: string,
    authorLastKnownAffiliationId: number,
    authorSequenceNumber: number,
    affiliationSlug: string,
    affiliationID: string,
  }[],
  year: number,
  shortJournal: string,
  publisher: string,
  issue: string,
  volume: string,
  page: string,
  retracted: boolean,
  memberId: number,
  issns: string[],
  editorialNotices: {
    status: string,
    date: string,
    noticeDoi: string,
    doi: string,
  }[],
  journalSlug: string,
  journal: string,
  preprintLinks: any[],
  publicationLinks: any[],
  normalizedTypes: string[],
};

type ScitePapersResponse = {
  papers: Record<string, ScitePapersItem>,
};

export {
  ScitePapersResponse,
  ScitePapersItem,
};
