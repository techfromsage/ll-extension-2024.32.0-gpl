import TitleParser from '@/modules/shared/scrape/googleScholar/TitleParser';
import AuthorsParser from '@/modules/shared/scrape/googleScholar/AuthorsParser';
import TypeParser from '@/modules/shared/scrape/googleScholar/TypeParser';

import HTMLElementArticle from '@/interfaces/tocAlerts/HTMLElementArticle';
import ArticleSearch from '@/interfaces/articleMetadata/ArticleSearch';

const extractDetailsForSearch = (element: HTMLElement): HTMLElementArticle<ArticleSearch> => {
  const title = TitleParser(element.querySelectorAll('h3').item(0).textContent || '');
  const authors = AuthorsParser(element.querySelectorAll('.gs_a').item(0).textContent || '');
  const type = TypeParser(element.querySelectorAll('h3').item(0).textContent || '');
  const url = element.querySelector('a')?.href || '';
  const citeId = element.getAttribute('data-cid') || '';

  return {
    article: {
      title,
      authors,
      type,
      url,
    },
    element,
    position: element.dataset.rp as string,
    citeId,
  };
};

export default (document: Document): HTMLElementArticle<ArticleSearch>[] => {
  return [...document.querySelectorAll<HTMLElement>('[data-rp]')]
    .map(extractDetailsForSearch)
    .filter(item => item.article.title);
};
