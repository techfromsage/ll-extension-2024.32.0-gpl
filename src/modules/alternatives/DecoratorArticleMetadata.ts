import DigitalResourceType from '@/enums/DigitalResourceType';
import ArticleMetadata from '@/interfaces/alternatives/ArticleMetadata';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import { MetadataForDoi } from '@/modules/alternatives/metadata/ScrapeMetadata';

/**
 * Obtains metadata for Article from DOI.
 * Primarily design to be used in a map function.
 */
export default (metadataService: (doi: string) => Promise<ArticleMetadata | undefined>, demandMetadata = false) =>
  async (resource: DigitalResource) => {
    // Attempt to get metadata from the DOI Metadata service.
    const metadata = await metadataService(resource.identifier);

    // If that fails, try to get metadata from the citations.
    let scrapedMetadata;
    if (!metadata || !metadata.articleTitle) {
      scrapedMetadata = MetadataForDoi(resource.identifier, document, demandMetadata);
    }

    return resource.type === DigitalResourceType.Article
      ? ({
        ...resource,
        metadata,
        scrapedMetadata,
      })
      : resource;
  };
