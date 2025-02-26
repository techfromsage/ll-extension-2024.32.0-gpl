/**
 * Looks to see if ebook URLs exist in an Institution's Holdings Systems
 */
import { v4 as uuidv4 } from 'uuid';
import State from '@/enums/State';
import FullTextBooksResponse from '@/interfaces/alternatives/FullTextBooksResponse';
import DigitalResourcesURLs from '@/interfaces/alternatives/DigitalResourcesURLs';
import FullTextBooksParamsAdapter from '@/modules/alternatives/fullText/FullTextBooksParamsAdapter';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import Institution from '@/interfaces/Institution';
import { HTTPRequest } from '@/interfaces/browser/AppMethods';
import UrlBuild from '@/modules/shared/UrlBuild';
import FilterDuplicateISBNs from '@/modules/shared/FilterDuplicateISBNs';
import FollowedUrls from './FollowedUrls';
import FindEbook from './FindEbook';

/**
 * Transforms the book entries into a specific format.
 * Merging the DigitalResource, holding information data, and institution data.
 *
 * @param isbn - The ISBN of the book.
 * @param book - The book object from the FullTextBooksResponse.
 * @param ebooks - An array of digital resources.
 * @param followedUrls - An object mapping ISBNs to followed URLs.
 * @param institution - The institution object.
 * @returns A new object representing the transformed book entry.
 */
const transformEntries = (institution: Institution, httpRequest: HTTPRequest, ebooks: DigitalResource[]) =>
  async (resource: Pick<DigitalResource, 'urls' | 'identifier' | 'title'>): Promise<DigitalResource | null> => {
    const ebook = ebooks.find(FindEbook(resource.identifier));
    if (!ebook) {
      return null;
    }

    const bookUrls = resource.urls.filter(Boolean);
    const [firstUrl] = bookUrls;
    const followed = await FollowedUrls(firstUrl, institution.access, httpRequest);
    return {
      ...ebook,
      ...resource,
      state: State.EbookFinder,
      urls: Array.from(new Set([...bookUrls, ...followed])),
      institution,
      referenceId: uuidv4(),
    };
  };

/**
 * Processes the response from the FullTextBooks API.
 *
 * This function does the following:
 * 1. Filters out entries from the response (holding information) that have no value.
 * 2. For each book in the response, follows the URLs using FollowedUrls to check for 301/302 redirects.
 * 3. Transforms the entries into a new format, removing duplicates based on ISBN and title, and returns the result.
 *
 * @param response - The response from the FullTextBooks API.
 * @param ebooks - An array of digital resources.
 * @param httpRequest - The HTTP request function to use.
 * @param institution - The institution object.
 * @returns A Promise that resolves to an array of transformed entries with duplicates removed.
 */
const urls = (
  urlTemplate: string,
  httpRequest: HTTPRequest,
  ebooks: DigitalResource[],
  institution: Institution,
) => async (): Promise<DigitalResource[]> => {
  try {
    const resources = JSON.stringify(FullTextBooksParamsAdapter(ebooks));
    const url = UrlBuild(urlTemplate, { instituteId: institution.id, resources }).generate();
    const response = await httpRequest<FullTextBooksResponse>({ method: 'get', url, headers: { 'cache-control': 'default' } });

    const responseItems = Object
      .entries(response)
      .map(([isbn, book]) => (book ? { ...book, identifier: isbn } : null));

    const promises = FilterDuplicateISBNs('identifier', 'title', responseItems.filter(Boolean))
      .map(transformEntries(institution, httpRequest, ebooks));
    return (await Promise.all(promises)).filter(Boolean);
  } catch {
    return [];
  }
};

/**
 * Constructs a DigitalResourcesURLs object for FullTextFinderBooks.
 */
const FullTextFinderBooks = (
  urlTemplate: string,
  ebooks: DigitalResource[],
  institution: Institution,
  httpRequest: HTTPRequest,
): DigitalResourcesURLs => {
  return {
    urls: urls(urlTemplate, httpRequest, ebooks, institution),
    state: State.FullTextFinder,
  };
};

export default FullTextFinderBooks;
