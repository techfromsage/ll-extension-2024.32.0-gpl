import { Config } from '@/interfaces/Config';
import browserMethods from '@/browserMethods';
import MultipleArticlesMetadata from '@/modules/shared/articlesMetadata/MultipleArticlesMetadata';
import HTMLElementArticle from '@/interfaces/tocAlerts/HTMLElementArticle';
import ArticleSearch from '@/interfaces/articleMetadata/ArticleSearch';
import SearchResultItem from '@/interfaces/SearchResultItem';

/**
 * For a given set of scraped articles, fetch its metadata from the API,
 */
export default (config: Config, scrapedArticles: HTMLElementArticle<ArticleSearch>[]): Promise<SearchResultItem[]> => {
  return new Promise(resolve => {
    const articlesSearchFields = scrapedArticles.map(({ article }) => article);
    const { httpRequest } = browserMethods.app.contentScript;
    MultipleArticlesMetadata(config.api.search, httpRequest, articlesSearchFields)
      .then(items => {
        const filteredItems = items.filter(item => item.metadata.issn?.length);
        resolve(filteredItems);
      })
      .catch(() => resolve([]));
  });
};
