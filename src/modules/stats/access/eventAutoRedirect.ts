import LLAStatType from '@/enums/LLAStatType';
import ResourceDomainTypes from '@/enums/ResourceDomainTypes';
import { statEventAccess } from '@/background/listeners/onStatEventAccess';

export default (url: URL, redirectType: ResourceDomainTypes, instituteId: string) => {
  statEventAccess({
    type: LLAStatType.AUTO_REDIRECT,
    url: url.hostname,
    redirectType,
    instituteId,
  });
};
