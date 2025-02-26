import NonAcademicType from '@/enums/NonAcademicType';
import ScraperType from '@/enums/ScraperType';
import DigitalResourceType from '@/enums/DigitalResourceType';
import NonAcademicMetadata from '@/interfaces/sciwheel/NonAcademicMetadata';

/**
 * Interface NonAcademicResource is used to represent a webpage
 * in the system.
 */
interface NonAcademicResource {
  type: DigitalResourceType | NonAcademicType,
  identifier: string,
  urls: string[],
  referenceId: string, // Used to deduplicate resources in stats in the backend
  metadata?: NonAcademicMetadata,
  title?: string,
  scraperType?: ScraperType,
}

export default NonAcademicResource;
