import Annotation, { DeserializedRange } from '@/interfaces/highlightAndAnnotate/Annotation';
import xPathToCssSelector from './xPathToCssSelector';

/**
 *
 * @param {Annotation} annotation - The annotation object from SW API.
 * @returns {DeserializedRange} The deserialized range object.
 */

const deserializeRange = (annotation: Annotation): DeserializedRange => {
  const defaultRange = {
    anchorNodeParent: null,
    anchorOffset: 0,
    focusNodeParent: null,
    focusOffset: 0,
  };

  const range = annotation?.ranges?.[0];

  if (!range) {
    return defaultRange;
  }

  const startSelector = xPathToCssSelector(range.start);
  const startEl = document.querySelector(startSelector);
  const endSelector = xPathToCssSelector(range.end);
  const endEl = document.querySelector(endSelector);

  if (!startEl || !endEl) {
    return defaultRange;
  }

  return {
    anchorNodeParent: startEl,
    anchorOffset: range.startOffset,
    focusNodeParent: endEl,
    focusOffset: range.endOffset,
  };
};

export default deserializeRange;
