import cssPathToxPath from './cssPathToxPath';
import flattenElement from './flattenElement';
import getCssPath from './getCssPath';
import getFlattenedElementTextAndOffset from './getFlattenedElementTextAndOffset';
import getRangeImages from './getRangeImages';
import getParentElementIgnoringSpans from './getParentElementIgnoringSpans';
import textContentInFlatElement from './textContentInFlatElement';

/**
 * Generates a selection object ready to be sent to Sciwheel API.
 *
 * @param {Selection} selection - the current window.getSelection()
 */
const formatSelectionObject = (selection: Selection) => {
  const {
    anchorNode, anchorOffset, focusNode, focusOffset,
  } = selection;

  const context = {
    v: '1',
    start: { containerText: null, offset: null },
    end: { containerText: null, offset: null },
  };

  const startElement = getParentElementIgnoringSpans(anchorNode);
  const endElement = getParentElementIgnoringSpans(focusNode);

  // Early exit if anchorNode or focusNode is null
  if (!startElement || !endElement || !anchorNode || !focusNode) {
    return {
      quoteContext: JSON.stringify(context),
      ranges: [
        {
          start: null,
          startOffset: 0,
          end: null,
          endOffset: 0,
        },
      ],
      quote: '',
      images: [],
    };
  }

  // Prepare quoteContext and ranges
  const startElementCssPath = cssPathToxPath(getCssPath(startElement as Element));
  const startElementFlat = flattenElement(startElement);
  const startFlatTextAndOffset = getFlattenedElementTextAndOffset(startElementFlat, anchorNode as Element, anchorOffset);
  const startQuoteContext = textContentInFlatElement(
    startElementFlat,
    anchorNode,
    anchorOffset,
    startFlatTextAndOffset.textContentBefore,
  );

  const endElementCssPath = cssPathToxPath(getCssPath(endElement as Element));
  const endElementFlat = flattenElement(endElement);
  const endFlatTextAndOffset = getFlattenedElementTextAndOffset(endElementFlat, focusNode as Element, focusOffset);
  const endQuoteContext = textContentInFlatElement(
    endElementFlat,
    focusNode,
    focusOffset,
    endFlatTextAndOffset.textContentBefore,
  );

  // Prepare images from the range, if any
  const images = getRangeImages(selection.getRangeAt(0).cloneContents());

  return {
    quoteContext: JSON.stringify({
      v: '1',
      start: startQuoteContext,
      end: endQuoteContext,
    }),
    ranges: [{
      start: startElementCssPath,
      startOffset: startFlatTextAndOffset.offset,
      end: endElementCssPath,
      endOffset: endFlatTextAndOffset.offset,
    }],
    quote: selection.toString(),
    images,
  };
};

export default formatSelectionObject;
