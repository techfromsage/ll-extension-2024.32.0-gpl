/**
 * Interface InstitutionListItem represents a list of institutions.
 */
export type InstitutionListItem = {
  id: string,
  name: string,
};

export type InstitutionList = {
  institutions: InstitutionListItem[],
};
