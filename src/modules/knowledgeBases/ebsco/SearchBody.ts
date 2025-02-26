/**
 * Search body payload for EBSCO API.
 *
 * Documentation (needs authentication) - http://edswiki.ebscohost.com/EDS_API_Documentation
 * Handy tool for testing - https://eds-api.ebscohost.com/Console/
 *
 * @param {string} searchQuery
 */
export default (searchQuery: string) => ({
  SearchCriteria: {
    Queries: [
      {
        BooleanOperator: 'AND',
        Term: searchQuery,
      },
    ],
    SearchMode: 'all',
    IncludeFacets: 'n',
    Sort: 'relevance',
    AutoSuggest: 'n',
    AutoCorrect: 'n',
  },
  RetrievalCriteria: {
    View: 'brief',
    ResultsPerPage: 20,
    PageNumber: 1,
    Highlight: 'n',
  },
});
