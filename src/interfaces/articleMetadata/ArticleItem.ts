/**
 * ArticleItem represents the specific Article Metadata properties for a response .e.g title, publisher etc..
 */

import { OpenAccessVersion } from '../ui/OpenAccessUI';

// Locations
type UnpaywallLocations = {
  updated: string,
  version: OpenAccessVersion,
  url: string,
  isBest: boolean,
};

type DoabLocations = {
  url: string,
  isBest: boolean,
};

type Locations<Provider = DoabInfo | UnpaywallInfo> =
  Provider extends UnpaywallInfo ? UnpaywallLocations
    : DoabLocations;

// Info
type UnpaywallInfo = {
  locations: Locations<UnpaywallInfo>[],
  updated: string,
  oaStatus: string,
};

type DoabInfo = {
  locations: Locations<DoabInfo>[],
  updated: string,
};

type OpenAccessInfo = {
  doab?: DoabInfo,
  unpaywall?: UnpaywallInfo,
};

export type ArticleOpenAccess = { [K in keyof OpenAccessInfo]: K extends 'doab' ? DoabInfo : UnpaywallInfo; };

interface ArticleItem {
  title: string[],
  authors: string[],
  authorsSplit: {
    family: string,
    given: string,
  }[],
  doi: string,
  type: string,
  publisher?: string,
  'publisher-location'?: string,
  'container-title'?: string[],
  page?: string,
  volume?: string,
  issue?: string,
  ISSN?: string[] | null,
  ISBN?: string[] | null,
  issued?: string,
  openAccess?: ArticleOpenAccess,
}

export default ArticleItem;
