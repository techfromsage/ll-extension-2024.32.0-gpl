/**
 * Campus tracks if an IP is on or off campus for an institution.
 */
import { inRange } from 'range_check';
import { store } from '@/store';
import Institution from '@/interfaces/Institution';
import OnCampus from '@/interfaces/OnCampus';

interface Campus {
  set: (institutes: Institution[], ip: string) => OnCampus,
  get: (instituteId: string, campusStore: OnCampus) => boolean,
}

export default (): Campus => ({
  set: (institutes, ip) => {
    const { setOnCampus } = store.getState();
    institutes.forEach((institution => {
      if (!ip || !institution.enableIpRangeValidation) {
        return setOnCampus({ [institution.id]: false });
      }

      const ranges = institution.ipRanges?.filter(range => inRange(ip, range)) || [];
      return setOnCampus({ [institution.id]: (ranges.length > 0) });
    }));
    return {};
  },
  get: (instituteId, campusStore) => campusStore[instituteId],
});
