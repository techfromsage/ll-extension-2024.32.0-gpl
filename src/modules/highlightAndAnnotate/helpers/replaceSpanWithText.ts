/**
 * Replaces a span element with a text node containing the span's text content.
 * @param span
 */
const replaceSpanWithText = (span: HTMLElement) => {
  const spanText = document.createTextNode(span.textContent ?? '');
  const parentElement = span.parentNode;
  if (parentElement) {
    parentElement.replaceChild(spanText, span);
    parentElement.normalize();
  }
};
export default replaceSpanWithText;
