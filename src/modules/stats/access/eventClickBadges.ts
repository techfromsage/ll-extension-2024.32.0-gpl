import browserMethods from '@/browserMethods';
import LLAStatType from '@/enums/LLAStatType';

export default (instituteId: string) => {
  browserMethods.app.statEventAccess({
    type: LLAStatType.CLICK_BADGE,
    instituteId,
  });
};
