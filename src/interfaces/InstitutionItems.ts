/**
 * Interface InstitutionItems represents storing a set of items related to an institution e.g.
 * Custom Messages.
 */
interface InstitutionItems<Items> {
  [institutionId: string]: Items[],
}

export default InstitutionItems;
