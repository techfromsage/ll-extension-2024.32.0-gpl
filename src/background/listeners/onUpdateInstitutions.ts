/**
 * Register listener for when user's institutions are updated
 * This ONLY runs when the user selects or adds a new institution.
 */
import { sessionStore, store, StoreState } from '@/store';
import browserMethods from '@/browserMethods';
import BackgroundStoreResponse from '@/enums/BackgroundStoreResponse';
import eventOpenOnboardingTutorial from '@/modules/stats/access/eventOpenOnboardingTutorial';
import Institution from '@/interfaces/Institution';
import StoreNamespace from '@/enums/StoreNamespace';
import StoreInstituteIds from '@/interfaces/StoreInstituteIds';
import fetchInstitutionData from '@/background/fetchData/fetchInstitutionData';
import clearSessionStorage from '@/background/session/clearSessionStorage';

/**
 * Open the onboarding tutorial for a given institution.
 * @param institution
 */
export const openOnboardingTutorial = (institution: Institution) => {
  if (institution.onboardingTutorialUrl) {
    eventOpenOnboardingTutorial(institution.id);
    browserMethods.tabs.background.create(institution.onboardingTutorialUrl, false);
  }
};

/**
 * Handle opening onboarding tutorial if a new institution is added.
 *
 * @param state
 * @param prevInstitutions
 * @param newInstitutions
 */
const handleOnboarding = (state: StoreState, prevInstitutions: string[], newInstitutions: string[]) => {
  if (!newInstitutions || prevInstitutions?.length >= newInstitutions?.length) {
    return;
  }

  const newInstituteId = newInstitutions[newInstitutions.length - 1];
  const newInstitution = state.institutes.find(({ id }) => id === newInstituteId);
  if (!newInstitution) {
    return;
  }
  openOnboardingTutorial(newInstitution);
};

/**
 * Update the user's institutions.
 * @param institutionIds
 */
export default async (institutionIds: string[]): Promise<BackgroundStoreResponse> => {
  await clearSessionStorage(
    sessionStore.getState(),
    store.getState(),
    browserMethods.storage,
  );

  const state = await browserMethods.storage.getItem<StoreInstituteIds>(StoreNamespace.InstituteIds) || {};
  const prevInstitutions = state.instituteIds || [];
  await browserMethods.storage.setItem(StoreNamespace.InstituteIds, institutionIds);
  const newInstitutionStore = await fetchInstitutionData();
  handleOnboarding(newInstitutionStore.storeState, prevInstitutions, institutionIds);
  return Promise.resolve(newInstitutionStore);
};
