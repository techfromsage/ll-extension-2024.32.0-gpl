import { v4 as uuidv4 } from 'uuid';
import ArticleMetadata from '@/interfaces/alternatives/ArticleMetadata';
import SearchResultItem from '@/interfaces/SearchResultItem';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import ArticleSearch from '@/interfaces/articleMetadata/ArticleSearch';
import HTMLElementArticle from '@/interfaces/tocAlerts/HTMLElementArticle';
import ScraperType from '@/enums/ScraperType';
import CleanObject from '@/modules/shared/CleanObject';
import AdaptorMetadataType from '@/modules/shared/AdaptorMetadataType';

/**
 * This function converts scraped article data and associated metadata into a standardized format for digital resources.
 *
 * The function maps over each scraped article, finds its corresponding metadata by matching their positions, constructs a unique
 * identifier based on available metadata or defaults to the article's title, and then assembles the DigitalResource object.
 *
 * Usage: ReferenceManager
 */
export default (
  scrapedArticles: HTMLElementArticle<ArticleSearch>[],
  metadataArticles: SearchResultItem[],
): DigitalResource[] => {
  return scrapedArticles.map(article => {
    const metadataArticle = metadataArticles.find(metadata => metadata.position.toString() === article.position);

    const identifier = metadataArticle?.metadata?.doi
    || metadataArticle?.metadata?.issn
    || metadataArticle?.metadata?.isbn
    || article.article.title;

    const cleanMetadata = CleanObject({
      doi: metadataArticle?.metadata?.doi,
      author: metadataArticle?.metadata.author || article.article.authors[0],
      ...metadataArticle?.metadata,
    }) as ArticleMetadata;

    return {
      type: AdaptorMetadataType(metadataArticle?.metadata.type || ''),
      urls: [article.article.url],
      identifier, // this is not unique, only use for display and sending to API
      referenceId: uuidv4(), // this is unique, use for keys
      title: article.article.title,
      metadata: cleanMetadata,
      scraperType: ScraperType.Text,
    };
  });
};
