import { v4 as uuidv4 } from 'uuid';
import NonAcademicType from '@/enums/NonAcademicType';
import ScraperType from '@/enums/ScraperType';
import NonAcademicMetadata from '@/interfaces/sciwheel/NonAcademicMetadata';
import NonAcademicResource from '@/interfaces/sciwheel/NonAcademicResource';
import { MetadataForNonAcademic } from '@/modules/alternatives/metadata/ScrapeMetadata';

export default (url: URL, document: Document): NonAcademicResource[] => {
  const { title } = document;

  if (!title) {
    return [];
  }

  const metadata: NonAcademicMetadata = MetadataForNonAcademic(document);
  return [{
    title,
    type: NonAcademicType.Website,
    urls: [url.href],
    identifier: url.href,
    referenceId: uuidv4(),
    scraperType: ScraperType.Meta,
    metadata,
  }];
};
