/**
 * Converts a CSS selector to an XPath expression.
 * Replaces '>' with '/' for element hierarchy,
 * and converts CSS's nth-of-type syntax to XPath indexing (e.g., [1]).
 *
 * Example:
 * CSS: html>body>div:nth-of-type(5)>main:nth-of-type(1)>div:nth-of-type(2)
 * XPath: /div[5]/main[1]/div[2]
 */

const cssPathToxPath = (path:string) => {
  return path.replace('html>body>', '/')
    .replace(/>/g, '/')
    .replace(/:nth-of-type\(/g, '[')
    .replace(/\)/g, ']');
};

export default cssPathToxPath;
