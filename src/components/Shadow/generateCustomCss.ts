/**
 * Creates a custom CSS from general customization. The end result
 * is a set of CSS variables that all components within the same
 * shadow DOM can use.
 */

import GeneralCustomization from '@/interfaces/GeneralCustomization';

interface RgbColorProps {
  r: number,
  g: number,
  b: number,
}

/**
 * Turns a hex string color into rgb color object
 *
 * @param {string} color
 * @returns {RgbColorProps}
 */
const hexToRgbColor = (color: string) => {
  const hex = color.slice(1);
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
};

/**
 * Takes an rgb color and calculates the brightness. Useful
 * when we need to calculate the contrast color
 *
 * @param {RgbColorProps} color
 * @returns {number}
 */
const getBrightness = (color: RgbColorProps) =>
  Math.round((color.r * 299 + color.g * 587 + color.b * 114) / 1000);

/**
 * Takes a hex string color and generates a new color
 * contrast color.
 *
 * @param {string} baseColor
 * @param {string} lightColor
 * @param {string} darkColor
 * @returns {string}
 */
const generateContrastColor = (baseColor: string, lightColor = '#FFFFFF', darkColor = '#000000') => {
  const color = hexToRgbColor(baseColor);
  const colorBrightness = getBrightness(color);
  const lightBrightness = getBrightness(hexToRgbColor('#FFFFFF'));

  return (Math.abs(colorBrightness) < lightBrightness / 2) ? lightColor : darkColor;
};

/**
 * Takes a hex string color and generates a 10% darker
 * version of the color.
 *
 * @param {string} baseColor
 * @returns {string}
 */
const generateDarkerColor = (baseColor: string) => {
  const color = hexToRgbColor(baseColor);
  const darkerR = Math.round(color.r * 0.9);
  const darkerG = Math.round(color.g * 0.9);
  const darkerB = Math.round(color.b * 0.9);

  const padComponent = (component: number) => {
    const hex = component.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${padComponent(darkerR)}${padComponent(darkerG)}${padComponent(darkerB)}`;
};

/**
 * Takes a hex string color and generates new colors
 * for the secondary button. This is useful when
 * the primary color is too bright and therefore
 * it's not accessible on a white background.
 *
 * @param {string} baseColor
 * @returns {{[key: string]: string, [key: string]: string}}}}
 */

const generateSecondaryButtonColors = (baseColor: string) => {
  const color = hexToRgbColor(baseColor);
  const colorBrightness = getBrightness(color);
  const lightBrightness = getBrightness(hexToRgbColor('#FFFFFF'));
  const notBright = Math.abs(colorBrightness) < lightBrightness / 2;

  return {
    color: notBright ? baseColor : '#474747',
    borderColor: notBright ? baseColor : '#6E6E6E',
  };
};

/**
 * Turns generalCustomization into CSS variables, with
 * primary, dark and contrast version.
 *
 * @param {GeneralCustomization} generalCustomization
 * @returns {string}
 */
const generateCustomCss = (generalCustomization?: GeneralCustomization) => {
  const primaryButtonColor = generalCustomization?.primary_button_color || '#00A980';
  const secondaryButtonColor = generalCustomization?.secondary_button_color || '#3B55AF';
  return `
    :host,
    :root {
      --primary-color: ${primaryButtonColor};
      --primary-dark-color: ${generateDarkerColor(primaryButtonColor)};
      --primary-contrast-color: ${generateContrastColor(primaryButtonColor)};
      --secondary-color: ${secondaryButtonColor};
      --secondary-dark-color: ${generateDarkerColor(secondaryButtonColor)};
      --secondary-contrast-color: ${generateContrastColor(secondaryButtonColor)};
      --secondary-button-color: ${generateSecondaryButtonColors(primaryButtonColor).color};
      --secondary-button-border-color: ${generateSecondaryButtonColors(primaryButtonColor).borderColor};
    }
  `;
};

export default generateCustomCss;
