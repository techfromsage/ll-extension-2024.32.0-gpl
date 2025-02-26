import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import NonAcademicResource from '@/interfaces/sciwheel/NonAcademicResource';
import CleanObject from '@/modules/shared/CleanObject';

interface ReferenceMetadata {
  doi?: string,
  isbn?: string,
  articleTitle: string,
  author?: string,
  publisher?: string,
  startPage?: string,
}

// convert ScrapedMetadata authorsSplit to a string of authors
const authorsToString = (authorsSplit: { given: string, family: string }[] | undefined): string | undefined => {
  if (!authorsSplit) {
    return undefined;
  }

  return authorsSplit.map(author => `${author.given} ${author.family}`).join(', ');
};

const CombinedMetadata = (resource: DigitalResource & NonAcademicResource): ReferenceMetadata => {
  const data = {
    doi: resource.metadata?.doi || resource.scrapedMetadata?.doi,
    isbn: resource.metadata?.isbn || resource.scrapedMetadata?.isbn,
    articleTitle: resource.metadata?.articleTitle
      || resource.scrapedMetadata?.articleTitle
      || resource.title
      || resource.identifier,
    author: resource.metadata?.author || authorsToString(resource.scrapedMetadata?.authorsSplit),
    publisher: resource.metadata?.publisher || resource.scrapedMetadata?.publisher,
    startPage: resource.metadata?.startPage || resource.scrapedMetadata?.startPage,
  };

  return CleanObject(data) as ReferenceMetadata;
};

export { ReferenceMetadata, CombinedMetadata };
