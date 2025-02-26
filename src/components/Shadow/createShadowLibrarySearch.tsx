import React from 'react';
import { render } from 'react-dom';
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import Platform from '@/interfaces/Platform';
import ShadowLibrarySearch from '@/components/Shadow/ShadowLibrarySearch';
import KnowledgeBase from '@/interfaces/librarySearches/KnowledgeBase';
import StateMachineLibrarySearch, {
  StateInterpreterLibrarySearch,
} from '@/modules/shared/stateMachine/StateMachineLibrarySearch';
import { interpret } from 'xstate';
import browserMethods from '@/browserMethods';
import ShadowList from '@/enums/ShadowList';
import containerGoogle from '@/components/Shadow/containerGoogle';
import containerGoogleScholar from '@/components/Shadow/containerGoogleScholar';

const wrapperContainer = (platform: Platform): HTMLElement | null => {
  if (platform === Platform.Google) {
    return containerGoogle();
  }
  if (platform === Platform.GoogleScholar) {
    return containerGoogleScholar();
  }
  return null;
};

/**
 * Change the GS Styles to accommodate a panel to the right hand side of the page.
 *
 * @param {HTMLElement} container
 */

export const destroyShadowLibrarySearch = () => {
  document.getElementById(ShadowList.LibrarySearch)?.remove();
};

const createContainer = (platform: Platform): HTMLDivElement => {
  destroyShadowLibrarySearch();
  const librarySearchContainer = wrapperContainer(platform);

  const newDiv = document.createElement('div');
  newDiv.id = ShadowList.LibrarySearch;
  librarySearchContainer?.append(newDiv);
  return newDiv;
};

/**
 * createShadowLibrarySearch
 */
export default (
  platform: Platform,
  knowledgeBases: KnowledgeBase[],
  url: URL,
) => {
  const searchQuery = url.searchParams.get('q') || '';

  window.stateInterpreterLayout.send(LayoutEvent.OpenLibrarySearch);
  window.stateInterpretersLibrarySearch = knowledgeBases.map(
    (knowledgeBase, index) => {
      const stateMachine = StateMachineLibrarySearch(
        knowledgeBase,
        searchQuery,
        index,
        browserMethods.app.contentScript.librarySearchQuery,
      );
      return interpret(stateMachine);
    },
  ) as unknown as StateInterpreterLibrarySearch[];

  render(
    <ShadowLibrarySearch
      stateInterpreterLayout={window.stateInterpreterLayout}
      stateInterpreterAppActive={window.stateInterpreterAppActive}
      stateInterpreterSettingsForm={window.stateInterpreterSettingsForm}
      stateInterpretersLibrarySearch={window.stateInterpretersLibrarySearch}
    />,
    createContainer(platform),
  );
};
