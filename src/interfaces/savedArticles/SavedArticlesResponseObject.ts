import UsersSavedArticles from '@/interfaces/UsersSavedArticles';

interface SavedArticlesResponseObject {
  totalHitCount: number,
  displayedItems: UsersSavedArticles[],
  selectedPage: number,
  resultsPerPage: number,
  highlighting: object,
  extraInfo: string | null,
  facets: string | null,
  endTo: number,
  startFrom: number,
  empty: boolean,
}

export default SavedArticlesResponseObject;
