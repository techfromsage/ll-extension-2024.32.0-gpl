import ResourceDomain from '@/interfaces/access/ResourceDomain';
import { StoreSlice } from '@/store';
import InstitutionAccess from '@/interfaces/InstitutionAccess';

/**
 * Stores any signed in/authenticated resource domains.
 * This also creates a temporary store called "potentialSignedInDomain" which tracks if a domain is about to be signed into.
 *
 * @see app-extension/src/modules/access/SignedInOpenAthens.ts
 */

export type PotentialSignInDomain = {
  resourceDomain: ResourceDomain,
  accessConfig: InstitutionAccess,
};

export interface SignedInDomainsSlice {
  signedInDomains: ResourceDomain[],
  addSignedInDomain: (domain: ResourceDomain) => void,
  removeSignedInDomain: (url: URL) => void,
  clearSignedInDomains: () => void,
  potentialSignedInDomain: PotentialSignInDomain | undefined,
  setPotentialSignedInDomain: (potential: PotentialSignInDomain) => void,
  clearPotentialSignedInDomain: () => void,
}

export const createSignedInDomainsSlice: StoreSlice<SignedInDomainsSlice> = set => ({
  signedInDomains: [],
  potentialSignedInDomain: undefined,
  addSignedInDomain: domain => set(state => ({ signedInDomains: [...state.signedInDomains, domain] })),
  clearSignedInDomains: () => set({ signedInDomains: [] }),
  removeSignedInDomain: url => set(state => ({
    signedInDomains: state.signedInDomains.filter(({ domain }) => {
      return domain.replace(/-/g, '.') !== url.hostname;
    }),
  }
  )),
  setPotentialSignedInDomain: potentialSignedInDomain => set({ potentialSignedInDomain }),
  clearPotentialSignedInDomain: () => set({ potentialSignedInDomain: undefined }),
});
