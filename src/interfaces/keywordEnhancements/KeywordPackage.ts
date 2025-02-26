export interface Keyword {
  definition: string,
  link: string,
  name: string,
}

interface KeywordPackage {
  resource_links: string[],
  button_text: string | null,
  header_description: string | null,
  header_title: string | null,
  keywords: Keyword[],
  logo: string | null,
  name: string,
  uuid: string,
  color?: string,
}

export default KeywordPackage;
