type IndexType = number | undefined;

/**
 * Adjusts the indexes so that the start index is always less than the end index.
 * Primarily used for backward highlighting text nodes.
 *
 * @param indexes - Array containing startIndex and endIndex.
 * @returns An array where the first element is the adjusted start index,
 *          and the second element is the adjusted end index.
 */
const adjustIndexes = (
  indexes: IndexType[],
): IndexType[] => {
  const [startIndex, endIndex] = indexes;

  return startIndex !== undefined && endIndex !== undefined && startIndex > endIndex
    ? [endIndex, startIndex]
    : [startIndex, endIndex];
};

export default adjustIndexes;
