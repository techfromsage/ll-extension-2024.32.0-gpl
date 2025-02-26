/* eslint-disable react/jsx-props-no-spreading */
import React, {
  ComponentType, useContext, useEffect, useState,
} from 'react';
import AppActiveState from '@/enums/stateMachine/AppActiveState';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';

type LoadingProps = {
  showLoading: boolean,
};

/**
 * HOC to show loading spinner after a delay
 */
const withLoadingDelay = <ChildProps extends object>(
  WrappedComponent: ComponentType<ChildProps & LoadingProps>,
  delay = 1000,
) => {
  return (props: ChildProps) => {
    const [showLoading, setShowLoading] = useState(false);
    const { appActive } = useContext(AppActiveReactContext);
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowLoading(appActive === AppActiveState.Loading);
      }, delay);

      return () => clearTimeout(timer);
    }, [delay, appActive]);

    // Pass isLoading to the WrappedComponent
    return <WrappedComponent {...props} showLoading={showLoading} />;
  };
};

export default withLoadingDelay;
