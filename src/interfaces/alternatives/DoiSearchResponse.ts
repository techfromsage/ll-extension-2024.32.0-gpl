/**
 * Interface DoiSearchResponse is the response expected from the elastic search DOI lookup
 *
 * @see https://search.leanlibrary.com/article_metadata/_doc/10.1073_pnas.1903534116
 */
import ArticleItem from '@/interfaces/articleMetadata/ArticleItem';

interface DoiSearchResponse {
  _source: ArticleItem,
}

export default DoiSearchResponse;
