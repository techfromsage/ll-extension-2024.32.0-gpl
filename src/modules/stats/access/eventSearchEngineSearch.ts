import LLAStatType from '@/enums/LLAStatType';
import { statEventAccess } from '@/background/listeners/onStatEventAccess';

/**
 * @param instituteId
 * @param searchEngineId
 */
export default (instituteId: string, searchEngineId: string) => {
  return statEventAccess({
    type: LLAStatType.SEARCH_ENGINE_SEARCH,
    searchEngineId,
    instituteId,
  });
};
