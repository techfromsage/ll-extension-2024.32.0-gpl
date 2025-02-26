/**
 * Interface InstitutionObject represents storing an object related to an institution e.g.
 * Content.
 */
interface InstitutionObject<Obj> {
  [institutionId: string]: Obj,
}

export default InstitutionObject;
