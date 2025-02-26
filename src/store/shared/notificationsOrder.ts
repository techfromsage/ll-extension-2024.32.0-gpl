import { StoreSlice } from '@/store';
import State from '@/enums/State';
import statesMultiInstitutionData from '@/modules/shared/stateMachine/states/statesMultiInstitution.data';
import statesOpenAccessPriorityData from '@/modules/shared/stateMachine/states/statesOpenAccessPriority.data';
import statesDefaultData from '@/modules/shared/stateMachine/states/statesDefault.data';

export interface NotificationsOrderSlice {
  notificationsOrder: State[],
  setNotificationsOrder: (multiInstitution: boolean, openAccessPriority: boolean) => State[],
}

/**
 * Returns pre-defined order based on values.
 *
 * @param {boolean} multiInstitution
 * @param {boolean} openAccessPriority
 * @returns {State[]}
 */
const determineNotificationsOrder = (multiInstitution: boolean, openAccessPriority: boolean): State[] => {
  if (multiInstitution) {
    return statesMultiInstitutionData;
  }
  return openAccessPriority
    ? statesOpenAccessPriorityData
    : statesDefaultData;
};

export const createNotificationsOrderSlice: StoreSlice<NotificationsOrderSlice> = set => {
  return ({
    notificationsOrder: [],
    setNotificationsOrder: (multiInstitution, openAccessPriority): State[] => {
      const notificationsOrder = determineNotificationsOrder(multiInstitution, openAccessPriority);
      set({ notificationsOrder });
      return notificationsOrder;
    },
  });
};
