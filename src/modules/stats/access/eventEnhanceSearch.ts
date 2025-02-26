import LLAStatType from '@/enums/LLAStatType';
import RedirectType from '@/enums/RedirectType';
import { statEventAccess } from '@/background/listeners/onStatEventAccess';

export default (redirectType: RedirectType, href: string, instituteId: string) => {
  statEventAccess({
    type: LLAStatType.ENHANCE_SEARCH,
    redirectType,
    url: href,
    instituteId,
  });
};
