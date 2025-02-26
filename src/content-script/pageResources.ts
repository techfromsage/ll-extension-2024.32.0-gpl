import uniqBy from 'lodash.uniqby';
import ISBN from 'isbn3';
import Institution from '@/interfaces/Institution';
import { Config } from '@/interfaces/Config';
import { HTTPRequest } from '@/interfaces/browser/AppMethods';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import DigitalResources from '@/modules/alternatives/DigitalResources';
import DecoratorArticleMetadata from '@/modules/alternatives/DecoratorArticleMetadata';
import DoiMetadataService from '@/modules/alternatives/doi/DoiMetadataService';
import AdaptorBookFromMetadata from '@/modules/alternatives/AdaptorBookFromMetadata';
import ISBNMetadataService from '@/modules/alternatives/isbn/ISBNMetadataService';
import SearchArticleMetadata from '@/modules/shared/articlesMetadata/SearchArticleMetadata';
import DecoratorBookMetadata from '@/modules/alternatives/DecoratorBookMetadata';
import FindPrimaryResources from '@/modules/shared/articlesMetadata/FindPrimaryResources';
import DigitalResourceType from '@/enums/DigitalResourceType';

/**
 * Scrape page for digital resources (e.g. DOI, ISBNs) and adds metadata to them.
 */
export default async (
  document: Document,
  institutes: Institution[],
  url: URL,
  config: Config,
  httpRequest: HTTPRequest,
  demandMetadata = false,
): Promise<DigitalResource[]> => {
  const institutionsEbook = institutes.filter(({ alternatives: { enabled, ebookFinder } }) => enabled && ebookFinder.enabled);

  const allResources = DigitalResources(document, url, institutionsEbook.length > 0, config.doiScraper, demandMetadata).find();

  // Get Article metadata first and convert to book if it turns out to be a book.
  // Retrieve metadata for primary resources
  const initialResources = demandMetadata
    ? allResources
    : allResources.reduce(FindPrimaryResources, []);

  const searchPage = initialResources.length > 1 || demandMetadata;

  // Don't get metadata for primary resources if we are on a search page we will demand this when we need it
  const primaryResources = (!searchPage || demandMetadata)
    ? await Promise.all(
      initialResources
        .map(DecoratorArticleMetadata(DoiMetadataService(config.api.search, httpRequest), searchPage))
        .map(AdaptorBookFromMetadata),
    )
    : [];

  // Combine and remove duplicates which cuts down on API calls.
  const uniqueResources = uniqBy(
    [...primaryResources, ...allResources],
    digitalResource => {
      // Reduce to first ISBN found if ISBN10 and ISBN13 are the same book
      if (digitalResource.type === DigitalResourceType.EBook) {
        return ISBN.asIsbn13(digitalResource.identifier);
      }

      // For articles match on DOI
      return digitalResource.identifier?.toLowerCase()
      // Fallback to title for articles without DOI or webpages for citation
        || digitalResource.title?.toLowerCase();
    },
  );

  // Next, we deal with ISBNS...
  const isbnMetadataService = ISBNMetadataService(config.api.isbnMetadata, httpRequest);
  const searchMetadataService = (query: Record<string, any>) => SearchArticleMetadata(config.api.search, httpRequest, query);
  return Promise.all(uniqueResources.map(DecoratorBookMetadata(isbnMetadataService, searchMetadataService)));
};
