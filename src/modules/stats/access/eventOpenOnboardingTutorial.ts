import LLAStatType from '@/enums/LLAStatType';
import { statEventAccess } from '@/background/listeners/onStatEventAccess';

export default (instituteId: string) => {
  statEventAccess({
    type: LLAStatType.OPEN_ONBOARDING_TUTORIAL,
    openType: 'auto',
    instituteId,
  });
};
