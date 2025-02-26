import State from '@/enums/State';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import DigitalResourcesURLs from '@/interfaces/alternatives/DigitalResourcesURLs';
import Institution from '@/interfaces/Institution';
import { HTTPRequest } from '@/interfaces/browser/AppMethods';
import FullTextPhysicalResponse, { PrintHolding } from '@/interfaces/alternatives/FullTextPhysicalResponse';
import DigitalResourceType from '@/enums/DigitalResourceType';
import GeneratePrintHoldingsLink from '@/modules/shared/notifications/GeneratePrintHoldingsLink';
import bootstrap from '@bootstrap/index';

const fetchPrintHoldings = async (
  httpRequest: HTTPRequest,
  books: DigitalResource[],
  institution: Institution,
): Promise<PrintHolding[]> => {
  try {
    const { id } = institution;
    const printHoldingsUrl = bootstrap.api.printHoldings.replace('{instituteId}', id);

    const joinedBooks = books.map(book => `${book.identifier},${book.isbnMetadata?.relatedIsbns?.join(', ')}`).join(', ');
    const encodedBooks = btoa(joinedBooks);

    const response = await httpRequest<FullTextPhysicalResponse>({
      method: 'get',
      url: printHoldingsUrl.replace('{isbn}', encodedBooks),
      headers: { 'cache-control': 'default' },
    });

    return response?.printHoldings.filter(book => book.found) || [];
  } catch (error) {
    return [];
  }
};

const urls = (
  httpRequest: HTTPRequest,
  books: DigitalResource[],
  institution: Institution,
) => async (): Promise<DigitalResource[]> => {
  const printHoldings = await fetchPrintHoldings(httpRequest, books, institution);

  if (printHoldings.length === 0) {
    return [];
  }

  const { identifier } = printHoldings[0];
  const url = GeneratePrintHoldingsLink(institution, identifier, []);

  const digitalResourceResult: DigitalResource = {
    ...books[0],
    identifier,
    type: DigitalResourceType.PrintBook,
    state: State.PrintBookAvailable,
    urls: [url],
    institution,
  };

  return [digitalResourceResult];
};

const FullTextFinderPrintBook = (
  books: DigitalResource[],
  institution: Institution,
  httpRequest: HTTPRequest,
): DigitalResourcesURLs => {
  return {
    urls: urls(httpRequest, books, institution),
    state: State.PrintBookAvailable,
  };
};

export default FullTextFinderPrintBook;
