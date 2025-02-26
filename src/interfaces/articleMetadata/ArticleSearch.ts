import DigitalResourceType from '@/enums/DigitalResourceType';

/**
 * Represents the structure needed for querying an article.
 */
interface ArticleSearch {
  title: string,
  authors: string[],
  type: DigitalResourceType,
  url: string,
}

export default ArticleSearch;
