import React, { useContext, useEffect, useState } from 'react';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import Feature from '@/enums/Feature';

interface PopupAutoCloseProps {
  children: JSX.Element | JSX.Element[],
  notification?: NotificationUI,
}

let closeTimer: NodeJS.Timeout;

const PopupAutoClose = ({ children, notification }: PopupAutoCloseProps) => {
  if (!notification) {
    return <>{ children }</>;
  }

  const { layoutEvent, sendLayoutState, addToClosedHistory } = useContext(LayoutReactContext);
  const { storeState: { appSettings } } = useContext(AppActiveReactContext);

  const [paused, setPaused] = useState(false);
  const [pausedTimeRemaining, setPausedTimeRemaining] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const shouldTimeout = notification?.timeOut
    && notification.timeOut > 0
    && appSettings.showTimer
    && (layoutEvent.type === LayoutEvent.AutoOpen || layoutEvent.type === LayoutEvent.WindowResize);

  const countdownRemove = () => {
    sendLayoutState(LayoutEvent.Close);
    clearTimeout(closeTimer);
    setPaused(false);

    if (notification.feature === Feature.Assist) {
      addToClosedHistory(notification);
    }
  };

  const countdownCreate = () => {
    if (shouldTimeout) {
      setStartTime(Date.now());
      closeTimer = setTimeout(() => {
        countdownRemove();
      }, notification.timeOut);
    }
  };

  const countdownPause = () => {
    if (shouldTimeout) {
      clearTimeout(closeTimer);
      const timeElapsed = Date.now() - startTime;
      const previousPausedTime = pausedTimeRemaining > 0 ? pausedTimeRemaining : notification?.timeOut;
      setPausedTimeRemaining(previousPausedTime - timeElapsed);
      setPaused(true);
    }
  };

  const countdownResume = () => {
    if (shouldTimeout) {
      setStartTime(Date.now());
      closeTimer = setTimeout(() => {
        countdownRemove();
      }, pausedTimeRemaining);
      setPaused(false);
    }
  };

  // this is used for the animation delay, as it seems to run a magic number level delay, presumably due to some processing
  const countdownDelay = 175;

  useEffect(() => {
    countdownCreate();

    const cleanup = () => clearTimeout(closeTimer);

    return () => cleanup();
  }, []);

  return (
    <div
      onMouseEnter={countdownPause}
      onMouseLeave={countdownResume}
    >
      {!!shouldTimeout && (
      <div
        className="progress-bar"
        style={{
          animationPlayState: paused ? 'paused' : 'running',
          animationDuration: `${(notification?.timeOut || 0) + countdownDelay}ms`,
        }}
      />
      )}
      {children}
    </div>
  );
};

export default PopupAutoClose;
