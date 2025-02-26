import LibrarySearchState from '@/enums/stateMachine/LibrarySearchState';
import KnowledgeBase from '@/interfaces/librarySearches/KnowledgeBase';
import SearchResults from '@/interfaces/librarySearches/SearchResults';

type KnowledgeBaseResponse =
  | { status: LibrarySearchState.Success, results: SearchResults[] }
  | { status: LibrarySearchState.LoginNeeded, searchProvider: KnowledgeBase }
  | { status: LibrarySearchState.Failed }
  | { status: LibrarySearchState.Fetching };

export default KnowledgeBaseResponse;
