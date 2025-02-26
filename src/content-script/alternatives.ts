/**
 * Services are used to pre-configure features that can be used across the application.
 *
 * This encourages reuse and a single-point of truth for instantiating things.
 */
import { Config, OpenAccessConfig } from '@/interfaces/Config';
import Institution from '@/interfaces/Institution';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import DigitalResourcesURLs from '@/interfaces/alternatives/DigitalResourcesURLs';
import OpenAccessDB from '@/modules/alternatives/openAccess/OpenAccessDB';
import OpenAccessDBCore from '@/modules/alternatives/openAccess/OpenAccessDBCore';
import FullTextFinderArticle from '@/modules/alternatives/fullText/FullTextFinderArticle';
import FullTextFinderBooks from '@/modules/alternatives/fullText/FullTextFinderBooks';
import FullTextFinderPrintBook from '@/modules/alternatives/fullText/FullTextFinderPrintBook';
import BookOrderForm from '@/modules/alternatives/BookOrderForm';
import DoiOrderForm from '@/modules/alternatives/DoiOrderForm';
import State from '@/enums/State';
import AppSettings from '@/interfaces/AppSettings';
import browserMethods from '@/browserMethods';
import InstitutionItems from '@/interfaces/InstitutionItems';
import { DeniedDomains } from '@/store/shared/institution';
import StateAllowed from '@/modules/shared/stateMachine/guards/StateAllowed';
import StateSort from '@/modules/shared/StateSort';
import DigitalResourceType from '@/enums/DigitalResourceType';
import GetPageType, { PageType } from '@/modules/shared/GetPageType';

type LookupPredicates = {
  currentUrl: URL,
  enabledInstitutions: Institution[],
  institutionsDeniedDomains: InstitutionItems<DeniedDomains>,
};

/**
 * Check if Core is enabled for the institution by looking
 * into alternatives openAccess providers.
 *
 * @param openAccessInstitution
 * @returns {boolean}
 */
const coreEnabled = (openAccessInstitution: Institution): boolean =>
  openAccessInstitution.alternatives.openAccess.providers?.some(provider => provider.id === 'core') || false;

/**
 * Generates OpenAccess lookups for the Open Access DBs.
 *
 * @param openAccessInstitutions
 * @param {Config} config
 * @param httpRequest
 * @returns {DigitalResourcesURLs[]}
 */
const openAccessArticleLookups = (
  lookupPredicates: LookupPredicates,
) => {
  const { currentUrl, enabledInstitutions, institutionsDeniedDomains } = lookupPredicates;

  const openAccessInstitutions = enabledInstitutions.filter(institution => institution.alternatives.openAccess.enabled
    && StateAllowed(currentUrl, institutionsDeniedDomains, State.OpenAccess, institution.id));

  return (
    config: OpenAccessConfig,
  ) => {
    const { httpRequest } = browserMethods.app.contentScript;
    return (article: DigitalResource): DigitalResourcesURLs[] => (openAccessInstitutions.length ? [
      OpenAccessDB(article, openAccessInstitutions[0], httpRequest),
      ...(
        coreEnabled(openAccessInstitutions[0])
          ? [OpenAccessDBCore(config.core, config.coreApiKey, article, openAccessInstitutions[0], httpRequest)]
          : []
      ),
    ] : []);
  };
};

const openAccessBookLookups = (
  lookupPredicates: LookupPredicates,
) => {
  const { currentUrl, enabledInstitutions, institutionsDeniedDomains } = lookupPredicates;

  const openAccessInstitutions = enabledInstitutions.filter(institution => institution.alternatives.open_access_ebooks.enabled
    && StateAllowed(currentUrl, institutionsDeniedDomains, State.OpenAccess, institution.id));

  const { httpRequest } = browserMethods.app.contentScript;
  return (book: DigitalResource): DigitalResourcesURLs[] => (openAccessInstitutions.length ? [
    OpenAccessDB(book, openAccessInstitutions[0], httpRequest),
  ] : []);
};

/**
 * Generates FullText Article lookups for each institution.
 *
 * @param {Institution[]} institutions
 * @returns {DigitalResourcesURLs[]}
 */
const fullTextArticleLookup = (
  lookupPredicates: LookupPredicates,
) => {
  const { currentUrl, enabledInstitutions, institutionsDeniedDomains } = lookupPredicates;

  const institutions = enabledInstitutions.filter(institution => institution.alternatives.fullTextFinder.enabled
    && StateAllowed(currentUrl, institutionsDeniedDomains, State.FullTextFinder, institution.id));

  return (article: DigitalResource): DigitalResourcesURLs[] => {
    const { httpRequest } = browserMethods.app.contentScript;
    return institutions
      .map(institution => {
        const { holdingInformationUrl, fullTextFinder } = institution.alternatives;
        return FullTextFinderArticle(holdingInformationUrl, article, institution, httpRequest, fullTextFinder.params);
      });
  };
};

/**
 * Generates FullText Book lookups for each institution.
 *
 * @param {Institution[]} institutions
 * @returns {DigitalResourcesURLs[]}
 */
const fullTextBooksLookup = (
  lookupPredicates: LookupPredicates,
) => {
  const { currentUrl, enabledInstitutions, institutionsDeniedDomains } = lookupPredicates;
  const institutions = enabledInstitutions.filter(institution => institution.alternatives.ebookFinder.enabled
    && StateAllowed(currentUrl, institutionsDeniedDomains, State.EbookFinder, institution.id));

  const { httpRequest } = browserMethods.app.contentScript;
  return (books: DigitalResource[]) =>
    institutions
      .map(institution => [FullTextFinderBooks(institution.alternatives.holdingInformationUrl, books, institution, httpRequest)])
      .flat();
};

const fullTextPrintBookLookup = (
  lookupPredicates: LookupPredicates,
) => {
  const { currentUrl, enabledInstitutions, institutionsDeniedDomains } = lookupPredicates;
  const institutions = enabledInstitutions.filter(
    institution => institution.alternatives.print_book_alternatives.holdings_lookup_enabled
      && StateAllowed(currentUrl, institutionsDeniedDomains, State.PrintBookAvailable, institution.id),
  );

  const { httpRequest } = browserMethods.app.contentScript;
  return (books: DigitalResource[]) =>
    institutions
      .map(institution => [FullTextFinderPrintBook(
        books,
        institution,
        httpRequest,
      )])
      .flat();
};

/**
 * Generates OrderForm url with prefilled resource details
 *
 * @param {Institution[]} institutions
 * @return {DigitalResourcesURLs[]}
 */
const doiOrderFormLookup = (
  lookupPredicates: LookupPredicates,
) => {
  const { currentUrl, enabledInstitutions, institutionsDeniedDomains } = lookupPredicates;
  const institutions = enabledInstitutions.filter(institution => institution.alternatives.orderForm.enabled
    && StateAllowed(currentUrl, institutionsDeniedDomains, State.OrderForm, institution.id));

  return (resource: DigitalResource) => {
    return institutions
      .map(institution => {
        const { orderForm } = institution.alternatives;
        return DoiOrderForm(orderForm, resource, institution);
      });
  };
};

/**
 * Generates OrderForm url with prefilled resource details
 *
 * @param {Institution[]} institutions
 * @return {DigitalResourcesURLs[]}
 */
const bookOrderFormLookup = (
  lookupPredicates: LookupPredicates,
) => {
  const { currentUrl, enabledInstitutions, institutionsDeniedDomains } = lookupPredicates;
  const institutions = enabledInstitutions.filter(institution => institution.alternatives.orderForm.enabled
    && StateAllowed(currentUrl, institutionsDeniedDomains, State.OrderForm, institution.id));

  return (resource: DigitalResource) => {
    return institutions
      .map(institution => {
        const { isbn } = institution.alternatives.order_form;
        return BookOrderForm(isbn, resource, institution);
      });
  };
};

export interface Lookups {
  openAccessArticleLookups: (article: DigitalResource) => DigitalResourcesURLs[],
  openAccessBookLookups: (book: DigitalResource) => DigitalResourcesURLs[],
  fullTextArticleLookups: (article: DigitalResource) => DigitalResourcesURLs[],
  fullTextBooksLookups: (books: DigitalResource[]) => DigitalResourcesURLs[],
  fullTextPrintBookLookups: (books: DigitalResource[]) => DigitalResourcesURLs[],
  doiOrderFormLookups: (resource: DigitalResource) => DigitalResourcesURLs[],
  bookOrderFormLookups: (resource: DigitalResource) => DigitalResourcesURLs[],
}

/**
 * Array Reducer function to get the first set of Digital resources with valid URLs.
 *
 * @param {Promise<DigitalResource[]>} candidate
 * @param {DigitalResourcesURLs} request
 * @returns {Promise<DigitalResource[]>}
 */
const reduceToFirstUrls = async (
  candidate: Promise<DigitalResource[]>,
  request: DigitalResourcesURLs,
) => {
  const resources = await candidate;
  const hasUrls = resources.find(resource => resource.urls.length);
  return hasUrls ? resources : request.urls();
};

/**
 * Provides Alternative URLs for a given location.
 * Switch off complexity in favour of readability
 *
 * @see @/modules/alternatives/Alternatives.ts for more implementation.
 *
 * @param {Config} config
 * @param {Institution[]} institutions
 * @param {State[]} notificationsOrder
 * @param resources
 * @param {AppSettings} appSettings
 * @param httpRequest
 * @returns {Promise<DigitalResource[]>}
 */
// eslint-disable-next-line complexity
const alternatives = async (
  config: Config,
  institutions: Institution[],
  institutionsDeniedDomains: InstitutionItems<DeniedDomains>,
  currentUrl: URL,
  notificationsOrder: State[],
  resources: DigitalResource[],
  appSettings: AppSettings,
): Promise<DigitalResource[]> => {
  const enabledInstitutions = institutions.filter(institution => institution.alternatives.enabled);

  // If the page is not an article page, don't assign article to the first resource
  const [article] = GetPageType(resources) === PageType.ArticlePage
    ? resources.filter(resource => resource.type === DigitalResourceType.Article)
    : [];

  const books = resources.filter(resource => resource.type === DigitalResourceType.EBook);
  const { alternatives: settings } = appSettings;

  const lookupPredicates: LookupPredicates = { currentUrl, enabledInstitutions, institutionsDeniedDomains };

  const openAccess = settings.openAccess && article && openAccessArticleLookups(lookupPredicates)(config.api.openAccess)(article);
  const openAccessEbook = settings.openAccessEbook && books.length > 0 && openAccessBookLookups(lookupPredicates)(books[0]);
  const fullTextArticle = settings.article && article?.metadata && fullTextArticleLookup(lookupPredicates)(article);
  const doiOrderForm = settings.orderForm && article && doiOrderFormLookup(lookupPredicates)(article);
  const fullTextBooks = settings.ebook && books.length > 0 && fullTextBooksLookup(lookupPredicates)(books);
  const fullTextPrintBook = settings.printBook && books.length > 0 && fullTextPrintBookLookup(lookupPredicates)(books);
  const bookOrderForm = settings.orderForm && settings.orderFormBook && books.length > 0
    && bookOrderFormLookup(lookupPredicates)(books[0]);

  return [openAccess, openAccessEbook, fullTextArticle, doiOrderForm, fullTextBooks, fullTextPrintBook, bookOrderForm]
    .flat()
    .filter(Boolean)
    .sort(StateSort(notificationsOrder, 'state')).reduce(
      reduceToFirstUrls,
      Promise.resolve([]),
    );
};

export default alternatives;
