import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from '@xstate/react';
import LayoutState from '@/enums/stateMachine/LayoutState';
import LibrarySearchState from '@/enums/stateMachine/LibrarySearchState';
import LibrarySearchEvent from '@/enums/stateMachine/LibrarySearchEvent';
import { LibrarySearchTypeState, StateInterpreterLibrarySearch } from '@/modules/shared/stateMachine/StateMachineLibrarySearch';
import Board from '@/components/Board/Board';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import SettingsFormReactContext from '@/components/Context/SettingsFormReactContext';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import LibrarySearchContent from '@/components/LibrarySearch/LibrarySearchContent';
import SliderNav, { Slide } from '@/subComponents/SliderNav/SliderNav';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';

interface Props {
  stateInterpretersLibrarySearch: StateInterpreterLibrarySearch[],
}

/**
 * Select obtain values from the State Machine.
 */
const selectSnapshot = (state: LibrarySearchTypeState): LibrarySearchTypeState => state;

/**
 * Sends search query to knowledge base if not already successful
 * @param {StateInterpreterLibrarySearch} stateMachine
 * @param {boolean} done
 * @param {LibrarySearchState} value
 * @param {LibrarySearchContext} context
 */
const searchKnowledgeBase = (
  stateMachine: StateInterpreterLibrarySearch,
  { done, value }: LibrarySearchTypeState,
) => () => {
  if (done) {
    return;
  }
  if (value !== LibrarySearchState.Success) {
    stateMachine.start();
  }
  stateMachine.send(LibrarySearchEvent.SearchQuery);
};

/**
 * @param {StateInterpreterLibrarySearch[]} stateInterpretersLibrarySearch
 * @returns {JSX.Element}
 * @constructor
 */
const LibrarySearch = ({ stateInterpretersLibrarySearch }: Props) => {
  const { layoutValues } = useContext(LayoutReactContext);
  const { sendSettingsFormsState } = useContext(SettingsFormReactContext);
  const { storeState: { appSettings } } = useContext(AppActiveReactContext);

  if (layoutValues.librarySearch === LayoutState.LibrarySearchClosed) {
    return <></>;
  }

  // safety check, if data has changed that means there are less knowledge bases than before
  // we need to reset the recentLibrarySearch value to 0 to avoid errors
  if (appSettings.recentLibrarySearch > stateInterpretersLibrarySearch.length - 1) {
    sendSettingsFormsState(SettingsFormEvent.Submit, { name: 'recentLibrarySearch', value: [0] });
  }

  const [activeKnowledgeBase, setActiveKnowledgeBase] = useState<number>(appSettings.recentLibrarySearch);
  const stateMachineValues = useSelector(stateInterpretersLibrarySearch[activeKnowledgeBase], selectSnapshot);
  const searchCurrent = searchKnowledgeBase(stateInterpretersLibrarySearch[activeKnowledgeBase], stateMachineValues);

  const handleClick = (index: number) => {
    sendSettingsFormsState(SettingsFormEvent.Submit, { name: 'recentLibrarySearch', value: [index], withoutRefresh: true });
    setActiveKnowledgeBase(index);
  };

  useEffect(() => {
    searchCurrent();
    return () => {
      stateInterpretersLibrarySearch.forEach(interpreter => interpreter.stop());
    };
  }, [activeKnowledgeBase]);

  const sliderItems: Slide[] = stateInterpretersLibrarySearch.map(search => {
    const { context: { knowledgeBase } } = useSelector(search, selectSnapshot);
    return { uuid: knowledgeBase.uuid, name: knowledgeBase.name };
  });

  return (
    <Board
      title={appSettings.customizations.additional_library_search_text}
      closing={layoutValues.librarySearch === LayoutState.LibrarySearchClosing}
    >
      <SliderNav
        sliderItems={sliderItems}
        currentSlide={activeKnowledgeBase}
        screenSize={layoutValues.screenSize}
        onClick={handleClick}
      />
      <LibrarySearchContent refreshQuery={searchCurrent} values={stateMachineValues} />
    </Board>
  );
};

export default LibrarySearch;
