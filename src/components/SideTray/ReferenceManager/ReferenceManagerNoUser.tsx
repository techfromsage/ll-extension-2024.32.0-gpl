import React, { useEffect, useContext } from 'react';
import browserMethods from '@/browserMethods';
import useTabVisibility from '@/hooks/useTabVisibility';
import ReferenceManagerEvent from '@/enums/stateMachine/ReferenceManagerEvent';
import ReferenceManagerReactContext from '@/components/Context/ReferenceManagerReactContext';
import { ReferenceManagerOnboarding } from './ReferenceManagerOnboarding';

const ReferenceManagerNoUser = () => {
  const { sendReferenceManagerState } = useContext(ReferenceManagerReactContext);

  const isTabActive = useTabVisibility();
  const { fetchUser } = browserMethods.app.contentScript;
  useEffect(() => {
    const getUser = async () => {
      const { storeState: { user } } = await fetchUser();
      if (user?.firstName) {
        sendReferenceManagerState(ReferenceManagerEvent.CheckForUserSignIn);
      }
    };

    getUser();
  }, [isTabActive]);
  return (
    <ReferenceManagerOnboarding />
  );
};

export default ReferenceManagerNoUser;
