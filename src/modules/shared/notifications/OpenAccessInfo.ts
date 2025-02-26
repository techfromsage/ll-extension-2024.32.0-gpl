import State from '@/enums/State';
import Institution from '@/interfaces/Institution';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import { OpenAccessSource, OpenAccessVersion } from '@/interfaces/ui/OpenAccessUI';
import Content from '@/modules/shared/Content';

export interface OpenAccessInfo {
  version: string,
  source?: OpenAccessSource,
}

export default (alternative: DigitalResource, institution: Institution): OpenAccessInfo | undefined => {
  if (alternative.state !== State.OpenAccess) {
    return undefined;
  }

  const unpaywallMetadata = alternative.metadata?.openAccess?.unpaywall;

  const openAccessVersionContent = {
    [OpenAccessVersion.Published]: 'infoOpenAccessPublishedVersion',
    [OpenAccessVersion.Submitted]: 'infoOpenAccessSubmittedVersion',
    [OpenAccessVersion.Accepted]: 'infoOpenAccessAcceptedVersion',
  };

  return {
    version: unpaywallMetadata?.locations[0].version
      ? Content(institution.id, openAccessVersionContent[unpaywallMetadata.locations[0].version])
      : '',
    source: alternative.openAccess,
  };
};
