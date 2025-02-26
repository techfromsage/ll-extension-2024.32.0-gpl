import CleanObject from '@/modules/shared/CleanObject';
import ParseInputString from '@/modules/shared/ParseInputString';
import NonAcademicMetadata from '@/interfaces/sciwheel/NonAcademicMetadata';
import SciwheelReferenceType from '@/enums/sciwheel/SciwheelReferenceType';
import ScrapedMetadata from '@/interfaces/alternatives/ScrapedMetadata';

/**
 * Find the first element in the document that matches any of the selectors.
 * @param document
 * @param selectors
 */
const findFirstElement = (document: Document, selectors: string[]): HTMLMetaElement | null => {
  return selectors.reduce<HTMLMetaElement | null>((found, selector) => {
    return found || document.head.querySelector(selector);
  }, null);
};

const findAllElements = (document: Document, selectors: string[]): string[] => {
  const contents: string[] = [];
  selectors.forEach(selector => {
    const metaTags = document.querySelectorAll(selector);
    metaTags.forEach(metaTag => {
      const { content } = (metaTag as HTMLMetaElement);
      if (content) {
        contents.push(content);
      }
    });
  });
  return contents;
};

/**
 * Get the title metadata of the document.
 * @param document
 */
const title = (document: Document): string => {
  const selectors = [
    'meta[name="citation_title"]',
    'meta[property="citation_title"]',
    'meta[name="dc.Title"]',
    'meta[property="dc.Title"]',
    'meta[property="og:title"]',
    'meta[name="og:title"]',
  ];
  const titleMeta = findFirstElement(document, selectors);

  return titleMeta?.content ? ParseInputString(titleMeta.content) : '';
};

/**
 * Get the description metadata of the document.
 * @param document
 */
const description = (document: Document): string => {
  const selectors = [
    'meta[name="citation_description"]',
    'meta[property="citation_description"]',
    'meta[name="description"]',
    'meta[property="description"]',
    'meta[property="og:description"]',
  ];
  const descriptionMeta = findFirstElement(document, selectors);

  return descriptionMeta?.content ? ParseInputString(descriptionMeta.content) : '';
};

/**
 * Get the publication date metadata of the document.
 * @param document
 */
const publicationDate = (document: Document): string => {
  const selectors = [
    'meta[name="citation_publication_date"]',
    'meta[property="citation_publication_date"]',
    'meta[name="citation_date"]',
    'meta[property="citation_date"]',
    'meta[name="citation_online_date"]',
    'meta[property="citation_online_date"]',
    'meta[property="article:published_time"]',
  ];
  const publicationDateMeta = findFirstElement(document, selectors);

  return publicationDateMeta?.content ? publicationDateMeta.content : '';
};

/**
 * Get the journal metadata of the document.
 * @param document
 */
const journal = (document: Document): string => {
  const selectors = [
    'meta[name="citation_journal_title"]',
    'meta[property="citation_journal_title"]',
  ];

  const journalMeta = findFirstElement(document, selectors);

  return journalMeta?.content ? journalMeta.content : '';
};

/**
 * Get the publisher metadata of the document.
 * @param document
 */
const publisher = (document: Document): string => {
  const selectors = [
    'meta[name="citation_publisher"]',
    'meta[property="citation_publisher"]',
    'meta[property="article:publisher"]',
  ];

  const publisherMeta = findFirstElement(document, selectors);

  return publisherMeta?.content ? publisherMeta.content : '';
};

/**
 * Get the authors metadata of the document.
 * @param document
 */
const authorsSplit = (document: Document): object[] | [] => {
  const selectors = [
    'meta[name="citation_author"]',
    'meta[name="citation_authors"]',
    'meta[property="citation_author"]',
    'meta[property="citation_authors"]',
    'meta[property="article:author"]',
    'meta[property="article:authors"]',
  ];

  const authorsMeta = findAllElements(document, selectors);

  return authorsMeta
    .map(authors => {
      return authors.split(/[,;]/).map(author => author.trim());
    })
    .flat()
    .filter(author => author.length > 0)
    .map(author => {
      const [given, ...familyParts] = author.split(' ');
      return { given, family: familyParts.join(' ') };
    });
};

/**
 * Get the ISBN metadata of the document.
 * @param document
 */
const isbn = (document: Document): string => {
  const selectors = [
    'meta[name="citation_isbn"]',
    'meta[property="citation_isbn"]',
  ];

  const iSBNMeta = findFirstElement(document, selectors);

  return iSBNMeta?.content ? iSBNMeta.content : '';
};

/**
 * Get the start page metadata of the document.
 * @param document
 */
const startPage = (document: Document): string => {
  const selectors = [
    'meta[name="citation_firstpage"]',
    'meta[property="citation_firstpage"]',
  ];
  const startPageMeta = findFirstElement(document, selectors);

  return startPageMeta?.content ? startPageMeta.content : '';
};

/**
 * Get the volume metadata of the document.
 * @param document
 */
const volume = (document: Document): number | undefined => {
  const selectors = [
    'meta[name="citation_volume"]',
  ];

  const volumeMeta = findFirstElement(document, selectors);

  return (volumeMeta?.content && !Number.isNaN(volumeMeta?.content))
    ? Number(volumeMeta?.content)
    : undefined;
};

const type = (document: Document): string => {
  const selectors = [
    'meta[property="og:type"]',
  ];

  const typeMeta = findFirstElement(document, selectors);

  return typeMeta?.content ? typeMeta.content : '';
};

/**
 * Finds citation information in the meta tags of the document, specifically for academic articles.
 */
export const MetadataForDoi = (doi: string, document: Document, demandMetadata = false): ScrapedMetadata => {
  if (demandMetadata) {
    return { doi };
  }

  const metadata = {
    doi,
    articleTitle: title(document),
    articleDescription: description(document),
    authorsSplit: authorsSplit(document),
    journalTitle: journal(document),
    publisher: publisher(document),
    issued: publicationDate(document),
    isbn: isbn(document),
    startPage: startPage(document),
    volume: volume(document) || undefined,
    type: type(document),
  };

  return CleanObject(metadata) as ScrapedMetadata;
};

/**
 * Finds citation information in the meta tags of the document, specifically for non-academic articles
 * - eg news articles, blog posts, etc.
 */
export const MetadataForNonAcademic = (document: Document): NonAcademicMetadata => {
  const metadata = {
    articleTitle: title(document),
    authorsSplit: authorsSplit(document),
    publisher: publisher(document),
    date: publicationDate(document),
    synopsis: description(document),
    referenceType: SciwheelReferenceType.WEBSITE,
  };

  return CleanObject(metadata);
};
