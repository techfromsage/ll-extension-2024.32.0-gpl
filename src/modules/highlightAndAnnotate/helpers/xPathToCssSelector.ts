/**
 * Converts an XPath expression to a CSS selector.
 * Replaces '/' with '>' for element hierarchy,
 * and converts XPath indexing (e.g., [1]) to CSS's nth-of-type syntax.
 *
 * Example:
 * XPath: /div[5]/main[1]/div[2]
 * CSS: html>body>div:nth-of-type(5)>main:nth-of-type(1)>div:nth-of-type(2)
 */
const xPathToCssSelector = (xpath: string): string => {
  const xpathArray = xpath.split('/');

  // Increment the index of the element if it's a div
  // since we append the shadow root as the first div
  if (xpathArray[1].match(/div\[\d]/)) {
    xpathArray[1] = xpathArray[1].replace(/(\d+)/, match => (+match + 1).toString());
  }

  return xpathArray.join('/')
    .replace('/', 'html>body>')
    .replace(/\//g, '>')
    .replace(/\[/g, ':nth-of-type(')
    .replace(/\]/g, ')');
};

export default xPathToCssSelector;
