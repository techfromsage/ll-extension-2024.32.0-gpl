/**
 * Interface DigitalResource is used to represent an article/ebook
 * in the system.
 *
 * This is primarily used to represent articles/ebooks
 * found on a webpage in Alternatives.
 */
import DigitalResourceType from '@/enums/DigitalResourceType';
import ScraperType from '@/enums/ScraperType';
import ArticleMetadata from '@/interfaces/alternatives/ArticleMetadata';
import { ISBNMetadataItem } from '@/interfaces/alternatives/ISBNMetadataResponse';
import State from '@/enums/State';
import Institution from '@/interfaces/Institution';
import { OpenAccessSource } from '../ui/OpenAccessUI';

interface DigitalResource {
  type: DigitalResourceType,
  identifier: string,
  urls: string[],
  referenceId: string, // Used to deduplicate resources in stats in the backend
  institution?: Institution,
  metadata?: ArticleMetadata,
  isbnMetadata?: ISBNMetadataItem,
  scrapedMetadata?: ArticleMetadata,
  title?: string,
  state?: State,
  openAccess?: OpenAccessSource,
  scraperType?: ScraperType,
}

export default DigitalResource;
