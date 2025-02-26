/**
 * Interface FeaturesContext represents a "Xstate" state machine's context objects that can be used in guards and actions
 *
 * See Xstate docs - https://xstate.js.org/docs/guides/context.html#context
 *
 * Note this is in no way related to React Contexts which is a different technology.
 */
import AssistMessage from '@/interfaces/assist/AssistMessage';
import AccessConnection from '@/interfaces/access/AccessConnection';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import Institution from '@/interfaces/Institution';
import InstitutionItems from '@/interfaces/InstitutionItems';
import State from '@/enums/State';
import LibraryResource from '@/interfaces/libraryResources/LibraryResource';
import Platform from '@/interfaces/Platform';
import KnowledgeBase from '@/interfaces/librarySearches/KnowledgeBase';
import KeywordPackage from '@/interfaces/keywordEnhancements/KeywordPackage';
import { SessionStoreState, StoreState } from '@/store';
import SystemMessage from '../systemMessage/SystemMessage';

interface FeaturesContext {
  assistMessage: AssistMessage | undefined,
  accessConnections: AccessConnection[],
  alternativeURLs: DigitalResource[],
  systemMessage: SystemMessage | undefined,
  storeState: StoreState,
  sessionStoreState: SessionStoreState,
  institutions: Institution[],
  libraryResources: LibraryResource[],
  knowledgeBases: KnowledgeBase[],
  platform: Platform,
  currentTabId: number,
  currentUrl: URL,
  isProxyUrl: boolean,
  allowedStates: InstitutionItems<State>,
  keywordPackages: KeywordPackage[],
  searchPage: boolean,
}

export default FeaturesContext;
