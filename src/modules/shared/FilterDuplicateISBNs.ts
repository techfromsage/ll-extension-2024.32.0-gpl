import ISBN from 'isbn3';

/**
 * Filter out duplicate ISBNs, preferring ISBN-13 over ISBN-10.
 * @param {string} isbn
 * @param {<T extendsRecord<string, any>[]} list
 */
export default <T extends Record<string, any>>(isbn: string, title: string, ls: T[]) => {
  let list = ls.filter((value: any) => value[title] !== null); // filter out null titles
  list = list.filter((value: any, index, self) => index === self.findIndex((t: any) => (
    t[title] === value[title]))); // filter out duplicate titles
  list.sort((a: T, b: T) => {
    if (ISBN.parse(a[isbn])?.isIsbn13 && ISBN.parse(b[isbn])?.isIsbn10) {
      return -1;
    }
    return 1;
  });
  return list.filter((value: any, index, self) =>
    index === self.findIndex((t: any) => ISBN.asIsbn10(t[isbn]) === ISBN.asIsbn10(value[isbn])));
};
