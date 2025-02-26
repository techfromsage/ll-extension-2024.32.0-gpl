import { HTTPRequest } from '@/interfaces/browser/AppMethods';
import { ISBNMetadataResponse } from '@/interfaces/alternatives/ISBNMetadataResponse';
import { asIsbn13 } from 'isbn3';

export default (isbnMetadataUrl: string, httpRequest: HTTPRequest) => (isbn: string) => {
  const isbn13 = asIsbn13(isbn);
  const url = isbnMetadataUrl.replace(/{isbns}/g, btoa(isbn13));
  return httpRequest<ISBNMetadataResponse>({ method: 'get', url })
    .then(res => res.metadata.find(item => item.id === isbn13))
    .catch(() => undefined);
};
