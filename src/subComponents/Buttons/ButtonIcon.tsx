import React from 'react';
import MinimiseIcon from '@/icons/MinimiseIcon';
import SettingsIcon from '@/icons/SettingsIcon';
import HomeIcon from '@/icons/HomeIcon';
import AsideDownArrow from '@/icons/AsideDownArrow';
import CloseIcon from '@/icons/CloseIcon';
import ExpandIcon from '@/icons/ExpandIcon';
import RetryIcon from '@/icons/RetryIcon';
import SciwheelIcon from '@/icons/SciwheelIcon';
import ThreeDotsIcon from '@/icons/ThreeDotsIcon';

type ButtonTypeToIconMap = {
  [key: string]: JSX.Element,
};
const classes = ['button-icon'];

const buttonTypeToIconMap: ButtonTypeToIconMap = {
  settings: <SettingsIcon classes={classes} />,
  notifications: <HomeIcon classes={classes} />,
  referenceManager: <SciwheelIcon classes={classes} />,
  minimise: <MinimiseIcon classes={classes} />,
  newtab: <ExpandIcon classes={classes} />,
  retry: <RetryIcon classes={classes} />,
  dropdownToggle: <ThreeDotsIcon classes={classes} />,
  'aside-expand': <AsideDownArrow />,
  'aside-expand_inline': <AsideDownArrow />,
  close: <CloseIcon classes={classes} sizeModifier={-2} />,
  table_close: <CloseIcon classes={classes} sizeModifier={-2} />,
  'close--small': <CloseIcon classes={classes} sizeModifier={-5.3} />,
};

const ButtonIcon: React.FC<{ buttonType: string }> = ({ buttonType }) => {
  return buttonTypeToIconMap[buttonType] || null;
};

export default ButtonIcon;
