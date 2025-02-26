interface QuoteContext {
  containerText: string,
  offset: number,
}

/**
 * Trims special characters from the beginning of the containerText.
 * @param {QuoteContext} quoteContext - The quoteContext object.
 * @returns {QuoteContext} - The quoteContext object with the special characters trimmed.
 */

const trimSpecialChars = (quoteContext: QuoteContext): QuoteContext => {
  const startingSpaces = quoteContext.containerText.match(/^\W+/);

  if (startingSpaces) {
    const trimBy = startingSpaces[0].length;
    const newContainerText = quoteContext.containerText.slice(trimBy);
    const newOffset = quoteContext.offset - trimBy;

    return {
      containerText: newContainerText,
      offset: newOffset,
    };
  }

  return quoteContext;
};

export default trimSpecialChars;
