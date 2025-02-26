/**
 * Generates the TOC Alert URL that is used on the subscribe button.
 * @param {string} urlTemplate
 * @param {string} issn
 * @param {string} institution
 * @returns {string}
 */
export default (urlTemplate: string, issn: string, institution: string): string => urlTemplate
  .replace(/{issn}/g, issn)
  .replace(/{instituteId}/g, institution);
