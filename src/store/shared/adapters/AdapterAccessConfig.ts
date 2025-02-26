import InstitutionAccess from '@/interfaces/InstitutionAccess';

/**
 * Adds in institution and authenticated properties.
 *
 * @param {InstitutionAccess[]} access
 * @param {string} institution
 * @returns {InstitutionAccess[]}
 */
export default (access: InstitutionAccess[], institution: string): InstitutionAccess[] => {
  return access?.map(config => ({
    ...config,
    institution,
    authenticated: false,
  })) || [];
};
