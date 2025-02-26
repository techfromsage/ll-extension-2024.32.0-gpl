import colorPaletteColors from '@/components/ColorPalette/colorPaletteColors';

const findAnnotationBackgroundColor = (color: string) => {
  const foundColor = colorPaletteColors.find(colorObj => colorObj.abbreviation === color);
  return foundColor?.background || colorPaletteColors[0].background;
};

export default findAnnotationBackgroundColor;
