import KnowledgeBase from '@/interfaces/librarySearches/KnowledgeBase';
import KnowledgeBaseResponse from '@/interfaces/librarySearches/KnowledgeBaseResponse';
import SearchConfluence from '@/modules/knowledgeBases/confluence/SearchConfluence';
import SearchSharepoint from '@/modules/knowledgeBases/sharepoint/SearchSharepoint';
import SearchEbsco from '@/modules/knowledgeBases/ebsco/SearchEbsco';
import SearchExLibris from '@/modules/knowledgeBases/exlibris/SearchExLibris';
import SearchWorldcat from '@/modules/knowledgeBases/worldcat/SearchWorldcat';
import SearchTDNET from '@/modules/knowledgeBases/tdnet/SearchTDNET';
import SearchJSTOR from '@/modules/knowledgeBases/jstor/SearchJSTOR';
import SearchTrip from '@/modules/knowledgeBases/trip/SearchTrip';
import SearchJove from '@/modules/knowledgeBases/jove/SearchJove';
import SearchCustom from '@/modules/knowledgeBases/custom/SearchCustom';
import FetchClient from '@/interfaces/http/FetchClient';

/**
 * Search
 */

type KnowledgeBaseSearch = (
  searchQuery: string,
  knowledgeBase: KnowledgeBase,
  httpClient: FetchClient
) => Promise<KnowledgeBaseResponse>;

export default (sourceType: string): KnowledgeBaseSearch => {
  const map: { [name: string]: KnowledgeBaseSearch } = {
    confluence: SearchConfluence,
    sharepoint: SearchSharepoint,
    ebsco: SearchEbsco,
    exlibris: SearchExLibris,
    worldcat: SearchWorldcat,
    tdnet: SearchTDNET,
    jstor: SearchJSTOR,
    trip: SearchTrip,
    jove: SearchJove,
    custom: SearchCustom,
  };

  const search = map[sourceType];
  if (!search) {
    throw new Error('Search provider not recognised');
  }
  return search;
};
