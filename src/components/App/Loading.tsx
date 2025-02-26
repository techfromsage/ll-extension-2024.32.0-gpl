/**
 * Loading visual with "spinner".
 */
import React from 'react';
import Spinner from '@/subComponents/Spinner/Spinner';

interface Props {
  text?: string,
  asOverlay?: boolean,
}

const Loading = ({ text, asOverlay = false }: Props) => {
  const classes = [
    'loading-spinner',
    asOverlay && 'loading-spinner--overlay',
  ].filter(Boolean);
  return (
    <div className={classes.join(' ')} data-testid="Loading">
      <Spinner loading text={text} />
    </div>
  );
};

export default Loading;
