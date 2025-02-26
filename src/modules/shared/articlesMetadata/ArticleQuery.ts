/**
 * Article Query is the Elasticsearch query syntax we use to search for articles.
 * In this query, we are saying that the title MUST match and one or more authors SHOULD match.
 * We also "boost" the score if an author matches as this suggests a more accurate match.
 *
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html
 */
import ArticleSearch from '@/interfaces/articleMetadata/ArticleSearch';

export default ({ title, authors }: ArticleSearch) => {
  const authorQuery = authors.map(author => ({ term: { authors: { value: author, boost: 2 } } }));
  return {
    query: {
      bool: {
        must: [
          {
            match: {
              title: {
                query: title,
                minimum_should_match: '60%',
              },
            },
          },
        ],
        should: authorQuery,
        minimum_should_match: authorQuery.length ? 1 : 0,
      },
    },
    size: 1,
  };
};
