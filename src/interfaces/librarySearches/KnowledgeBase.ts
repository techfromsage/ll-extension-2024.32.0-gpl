/**
 * Represents the different Knowledge base types and their data.
 */
type Base = {
  uuid: string,
  name: string,
  platforms: string[],
  searchUrls: string[],
  sourceName: string,
  sourceUrl: string,
  defaultOrder: number,
  institution: string,
  resultsLimit: number,
};

export type KnowledgeBaseConfluence = Base & {
  sourceType: 'confluence',
  viewMoreUrl: string,
};

export type KnowledgeBaseSharepoint = Base & {
  sourceType: 'sharepoint',
  filesExcluded: string[],
};

export type KnowledgeBaseEbsco = Base & {
  sourceType: 'ebsco',
  customerId: string,
  profileId: string,
  groupId: string,
  authType: string | null,
  apiUserId: string,
  apiPassword: string,
  clientId: string,
  clientSecret: string,
};

export type KnowledgeBaseExLibris = Base & {
  sourceType: 'exlibris',
  viewMoreUrl: string,
  documentLink: string,
  apiKey: string | null,
};

export type KnowledgeBaseWorldcat = Base & {
  sourceType: 'worldcat',
  wskey: string,
  secret: string,
  viewMoreUrl: string,
  documentLink: string,
};

export type KnowledgeBaseTDNET = Base & {
  sourceType: 'tdnet',
  viewMoreUrl: string,
  documentLink: string,
  apiKey: string,
};

export type KnowledgeBaseJSTOR = Base & {
  sourceType: 'jstor',
};

export type KnowledgeBaseTrip = Base & {
  sourceType: 'trip',
  viewMoreUrl: string,
};

export type KnowledgeBaseJove = Base & {
  sourceType: 'jove',
  viewMoreUrl: string,
  apiKey: string,
  joveInstitutionId: string,
};

export type KnowledgeBaseCustom = Base & {
  sourceType: 'custom',
  responseType: 'xml' | 'json',
};

type KnowledgeBase =
  | KnowledgeBaseCustom
  | KnowledgeBaseJove
  | KnowledgeBaseJSTOR
  | KnowledgeBaseTrip
  | KnowledgeBaseTDNET
  | KnowledgeBaseWorldcat
  | KnowledgeBaseExLibris
  | KnowledgeBaseEbsco
  | KnowledgeBaseConfluence
  | KnowledgeBaseSharepoint;

export default KnowledgeBase;
