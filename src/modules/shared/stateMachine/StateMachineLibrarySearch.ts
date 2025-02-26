/**
 * StateMachineLibrarySearch is used to track the fetching and results of
 * each Library search/knowledge base.
 *
 * We use this info within the React Component to kick off fetching results,
 * and then displaying those results or failure/login messages.
 */
import {
  assign, createMachine, Interpreter, MachineConfig,
} from 'xstate';
import KnowledgeBase from '@/interfaces/librarySearches/KnowledgeBase';
import AppMethods from '@/interfaces/browser/AppMethods';
import SearchResults from '@/interfaces/librarySearches/SearchResults';
import LibrarySearchEvent from '@/enums/stateMachine/LibrarySearchEvent';
import LibrarySearchState from '@/enums/stateMachine/LibrarySearchState';

interface LibrarySearchStateSchema {
  initial: LibrarySearchState,
  states: {
    [LibrarySearchState.Init]: Record<string, unknown>,
    [LibrarySearchState.Fetching]: Record<string, unknown>,
    [LibrarySearchState.Success]: Record<string, unknown>,
    [LibrarySearchState.LoginNeeded]: Record<string, unknown>,
    [LibrarySearchState.Failed]: Record<string, unknown>,
  },
}

export type LibrarySearchEventSchema =
  | { type: LibrarySearchEvent.SearchQuery };

export type LibrarySearchContext = {
  searchResults: SearchResults[],
  knowledgeBase: KnowledgeBase,
  navIndex: number,
};

export interface LibrarySearchTypeState {
  value: LibrarySearchState,
  context: LibrarySearchContext,
  event: LibrarySearchEventSchema,
  done: boolean,
}

export type StateInterpreterLibrarySearch = Interpreter<
LibrarySearchContext,
LibrarySearchStateSchema,
LibrarySearchEventSchema,
LibrarySearchTypeState
>;

/**
 * @param {KnowledgeBase} knowledgeBase
 * @param {string} searchQuery
 * @param navIndex
 * @param {AppMethods["contentScript"]["librarySearchQuery"]} doSearch
 */
export default (
  knowledgeBase: KnowledgeBase,
  searchQuery: string,
  navIndex: number,
  doSearch: AppMethods['contentScript']['librarySearchQuery'],
) => {
  const machineConfig: MachineConfig<LibrarySearchContext, LibrarySearchStateSchema, LibrarySearchEventSchema> = {
    id: `StateMachineLibrarySearch-${knowledgeBase.uuid}`,
    predictableActionArguments: true,
    context: {
      searchResults: [],
      knowledgeBase,
      navIndex,
    },
    initial: LibrarySearchState.Init,
    on: {
      searchQuery: { target: LibrarySearchState.Fetching },
    },
    states: {
      [LibrarySearchState.Init]: {},
      [LibrarySearchState.Fetching]: {
        invoke: {
          src: () => () => doSearch(knowledgeBase, searchQuery),
          onDone: [
            {
              target: LibrarySearchState.LoginNeeded,
              cond: (_, { data }) => data.status === LibrarySearchState.LoginNeeded,
            },
            {
              target: LibrarySearchState.Failed,
              cond: (_, { data }) => data.status === LibrarySearchState.Failed,
            },
            {
              target: LibrarySearchState.Success,
              actions: assign({
                searchResults: (context, { data: { results } }) => results,
              }),
            },
          ],
          onError: LibrarySearchState.Failed,
        },
      },
      [LibrarySearchState.LoginNeeded]: {},
      [LibrarySearchState.Failed]: {},
      [LibrarySearchState.Success]: { type: 'final' },
    },
  };
  return createMachine<LibrarySearchContext, LibrarySearchEventSchema, LibrarySearchTypeState>(machineConfig);
};
