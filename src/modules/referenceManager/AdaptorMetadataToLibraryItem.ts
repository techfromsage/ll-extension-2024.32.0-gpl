import { SciwheelLibraryItem } from '@/interfaces/sciwheel/SciwheelLibraryItem';
import SciwheelReferenceType from '@/enums/sciwheel/SciwheelReferenceType';
import SciwheelIdType from '@/enums/sciwheel/SciwheelIdType';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import DigitalResourceType from '@/enums/DigitalResourceType';
import NonAcademicResource from '@/interfaces/sciwheel/NonAcademicResource';
import CleanObject from '@/modules/shared/CleanObject';
import ArticleMetadata from '@/interfaces/alternatives/ArticleMetadata';
import ScrapedMetadata from '@/interfaces/alternatives/ScrapedMetadata';
import NonAcademicMetadata from '@/interfaces/sciwheel/NonAcademicMetadata';

interface IdAndType {
  id: string,
  type: SciwheelIdType,
  referenceType?: SciwheelReferenceType,
}

// eslint-disable-next-line complexity
const getIdAndType = (
  resource: DigitalResource & NonAcademicResource,
  metadata: ArticleMetadata | ScrapedMetadata | NonAcademicMetadata,
): IdAndType => {
  if (resource.identifier && resource.type === DigitalResourceType.Article) {
    return {
      id: resource.identifier,
      type: SciwheelIdType.DigitalObjectId,
      referenceType: SciwheelReferenceType.RESEARCH_ARTICLE,
    };
  }

  if (
    (resource.identifier && resource.type === DigitalResourceType.EBook)
    || (resource.identifier && resource.type === DigitalResourceType.PrintBook)
  ) {
    return {
      id: resource.identifier,
      type: SciwheelIdType.CompositeArticleId,
      referenceType: SciwheelReferenceType.BOOK,
    };
  }

  if (resource.identifier && resource.type === DigitalResourceType.ArticlePubMed) {
    return {
      id: resource.identifier,
      type: SciwheelIdType.PubMedId,
      referenceType: SciwheelReferenceType.RESEARCH_ARTICLE,
    };
  }

  if (resource.title) {
    return {
      id: resource.title,
      type: SciwheelIdType.PageTitle,
      referenceType: SciwheelReferenceType.WEBSITE,
    };
  }

  // when metadata is found but no specific id, ComposeArticleId tells the server to attempt
  return {
    id: resource.identifier || resource.title || '',
    type: SciwheelIdType.CompositeArticleId,
    referenceType: (metadata as NonAcademicMetadata)?.referenceType,
  };
};

const AdaptorMetadataToLibraryItem = (
  resource: DigitalResource & NonAcademicResource,
  url: string,
): SciwheelLibraryItem | undefined => {
  const { metadata, scrapedMetadata } = resource;
  const combinedMetadata = { ...scrapedMetadata, ...metadata };

  if (!Object.keys(combinedMetadata).length && !resource.title) {
    return undefined;
  }

  const authorsArray = () => {
    if (combinedMetadata?.authorsSplit) {
      return combinedMetadata.authorsSplit.map(author => `${author.given} ${author.family}`);
    }
    return [];
  };

  const { id, type, referenceType } = getIdAndType(resource, combinedMetadata);

  const payload: SciwheelLibraryItem = {
    // applicationNumber: LL can't currently get this
    articleAbstract: combinedMetadata?.synopsis, // TODO: Currently only obtained for NonAcademicResources
    // assignees: LL can't currently get this,
    authors: authorsArray(),
    date: combinedMetadata?.issued || combinedMetadata?.date,
    // edition: LL can't currently get this,
    // editors: LL can't currently get this
    // fillingDate: LL can't currently get this
    id,
    isbn: combinedMetadata?.isbn,
    issn: combinedMetadata?.issn,
    issue: combinedMetadata?.issue,
    // issuingAuthority: LL can't currently get this
    journal: combinedMetadata?.journalTitle,
    // keywords: LL can't currently get this
    // matchType: LL can't currently get this
    pageTitle: combinedMetadata?.articleTitle || resource.title || '',
    pages: combinedMetadata?.pages,
    // patentNumber: LL can't currently get this
    // priorityNumber: LL can't currently get this
    // publicationPlace: LL can't currently get this
    publisher: combinedMetadata?.publisher,
    referenceType,
    // referrer: LL can't currently get this
    type,
    uri: resource.urls[0] || url,
    volume: combinedMetadata?.volume?.toString(),
  };

  return CleanObject(payload) as SciwheelLibraryItem;
};

export default AdaptorMetadataToLibraryItem;
