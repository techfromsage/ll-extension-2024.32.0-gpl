/**
 * Standardised Tallies API response.
 */
type SciteTalliesItem = {
  total: number,
  supporting: number,
  contradicting: number,
  mentioning: number,
  unclassified: number,
  doi: string,
  citingPublications: number,
};

type SciteTalliesResponse = {
  tallies: Record<string, SciteTalliesItem>,
};

export {
  SciteTalliesResponse,
  SciteTalliesItem,
};
