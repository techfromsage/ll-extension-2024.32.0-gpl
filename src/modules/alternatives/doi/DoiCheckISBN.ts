import ISBN from 'isbn3';

const REGEX_DOI_ISBN = new RegExp(
  [
    // Match the DOI prefix "10."
    '10\\.',
    // Match the registrant code (4 to 9 digits)
    '\\d{4,9}',
    // Match the slash after the registrant code
    '\\/',
    // Match the ISBN
    '[-._;():A-Z0-9]{13}',
  ].join(''),
  'gi',
);

const DoiCheckISBN = (doi: string): string => {
  const regexMatch = doi.match(REGEX_DOI_ISBN);
  if (regexMatch === null) {
    return doi;
  }

  const possibleIsbn = regexMatch[0].split('/')[1];
  if (ISBN.parse(possibleIsbn)?.isValid) {
    return regexMatch[0];
  }

  return doi;
};

export default DoiCheckISBN;
