/**
 * Builds a Document URL by replacing the "document_id" placeholder with record id.
 *
 * @param {string} urlTemplate
 * @param {string} recordId
 * @returns {string}
 */
export default (urlTemplate: string, recordId: string): string =>
  urlTemplate.replace(/\[document_id]/ig, recordId);
