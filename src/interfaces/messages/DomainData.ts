/**
 * DomainData is data that is used to determine features based only on the domain
 * (i.e. not based on the page content).
 */
import AssistMessage from '@/interfaces/assist/AssistMessage';
import SystemMessage from '@/interfaces/systemMessage/SystemMessage';
import LibraryResource from '@/interfaces/libraryResources/LibraryResource';
import KnowledgeBase from '@/interfaces/librarySearches/KnowledgeBase';
import Platform from '@/interfaces/Platform';
import KeywordPackage from '@/interfaces/keywordEnhancements/KeywordPackage';
import InstitutionItems from '@/interfaces/InstitutionItems';
import State from '@/enums/State';

interface DomainData {
  assistMessage: AssistMessage | undefined,
  systemMessage: SystemMessage | undefined,
  libraryResources: LibraryResource[],
  keywordPackages: KeywordPackage[],
  knowledgeBases: KnowledgeBase[],
  platform: Platform,
  isProxyUrl: boolean,
  allowedStates: InstitutionItems<State>,
}

export default DomainData;
