import LLAStatType from '@/enums/LLAStatType';
import { statEventAccess } from '@/background/listeners/onStatEventAccess';

export default (url: string, institutionId: string) => {
  statEventAccess({
    type: LLAStatType.CUSTOM_REDIRECT,
    url,
    redirectType: 'customRedirected',
    instituteId: institutionId,
  });
};
