import React, { useContext } from 'react';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import LayoutState from '@/enums/stateMachine/LayoutState';

interface Props {
  text?: string,
}

const Footer = ({ text }: Props) => {
  const { layoutValues } = useContext(LayoutReactContext);
  const classes = [
    'footer',
    layoutValues.layout === LayoutState.PopUp ? 'footer--popup' : 'footer--sidetray',
  ];
  return text ? (
    <aside
      className={classes.join(' ')}
      dangerouslySetInnerHTML={{ __html: text }}
      data-testid="Footer"
    />
  ) : null;
};

export default Footer;
