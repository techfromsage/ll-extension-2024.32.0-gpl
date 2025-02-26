import CustomSize from '@/enums/ui/CustomSize';
import ScreenSize from '@/enums/ui/ScreenSize';
import { useContext } from 'react';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';

const customSizeMultiplier = (customSize: CustomSize): number => {
  switch (customSize) {
    case CustomSize.ExtraSmall:
      return 0.85;
    case CustomSize.Small:
      return 1;
    case CustomSize.Medium:
      return 1.2;
    case CustomSize.Large:
      return 1.4;
    case CustomSize.ExtraLarge:
      return 1.6;
    default:
      return 1;
  }
};

const screenSizeMultiplier = (screenSize: ScreenSize): number => {
  switch (screenSize) {
    case ScreenSize.Small:
      return 1;
    case ScreenSize.Medium:
      return 1.2;
    case ScreenSize.Large:
      return 1.4;
    default:
      return 1;
  }
};
/**
 * @param  {number} modifier - used for alignment, all svg exports should match but sometimes the eye perceives differently
 * @return {string} {num}px - generated using modifier and a calc of the largest of screen/custom size modifier
 */
const CalculateIconSize = (modifier?: number) => {
  const { layoutValues } = useContext(LayoutReactContext);
  const { storeState: { appSettings } } = useContext(AppActiveReactContext);

  const screenSize: number = screenSizeMultiplier(layoutValues.screenSize);
  const customSize: number = customSizeMultiplier(appSettings.customTextSize as CustomSize);

  const multiplierMax = Math.max(screenSize, customSize);

  const iconSize = (12 + (modifier || 0)) * multiplierMax;
  const roundIconSize = Math.round(iconSize * 10) / 10;

  return `${roundIconSize}px`;
};

export default CalculateIconSize;
