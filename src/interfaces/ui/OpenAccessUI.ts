export enum OpenAccessVersion {
  Published = 'publishedVersion',
  Submitted = 'submittedVersion',
  Accepted = 'acceptedVersion',
}

export enum OpenAccessSource {
  Unpaywall = 'unpaywall',
  Core = 'core',
  Doab = 'doab',
}

export interface OpenAccessUI {
  version: string,
  source: string,
}
