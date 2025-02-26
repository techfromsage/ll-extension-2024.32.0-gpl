import DigitalResource from '@/interfaces/alternatives/DigitalResource';

export enum PageType {
  SearchPage = 'searchPage',
  ArticlePage = 'articlePage',
  Unknown = 'unknown',
}

// if there are multiple resources, set searchPage to true if they are all the same type
const GetPageType = (digitalResources: DigitalResource[]): PageType => {
  if (!digitalResources.length) {
    return PageType.Unknown;
  }

  if (digitalResources.length === 1) {
    return PageType.ArticlePage;
  }

  const resourcesMatch = digitalResources.every((resource, _, resources) => resource.scraperType === resources[0].scraperType);
  return resourcesMatch ? PageType.SearchPage : PageType.ArticlePage;
};

export default GetPageType;
