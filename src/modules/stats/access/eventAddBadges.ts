import LLAStatType from '@/enums/LLAStatType';
import browserMethods from '@/browserMethods';

export default (instituteId: string, identifiers: string[]) => {
  browserMethods.app.statEventAccess({
    type: LLAStatType.ADD_BADGES,
    badges: identifiers,
    instituteId,
  });
};
