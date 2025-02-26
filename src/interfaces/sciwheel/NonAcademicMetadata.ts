import SciwheelReferenceType from '@/enums/sciwheel/SciwheelReferenceType';

/**
 * Interface NonAcademicMetadata represents webpage metadata we get from the generic webpage metadata scrapers
 */
interface NonAcademicMetadata {
  articleTitle?: string,
  authorsSplit?: {
    family: string,
    given: string,
  }[],
  publisher?: string,
  synopsis?: string,
  date?: string,
  referenceType?: SciwheelReferenceType,
  doi?: string, // satisfy TS when combining metadata interfaces
  type?: string, // satisfy TS when combining metadata interfaces
  isbn?: string, // satisfy TS when combining metadata interfaces
}

export default NonAcademicMetadata;
