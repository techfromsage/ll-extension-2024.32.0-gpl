/**
 * Component `ReferenceManager` presents reference manager functionalities the expanded "tray mode".
 */
import React, { useContext, useEffect } from 'react';
import browserMethods from '@/browserMethods';
import ReferenceManagerState from '@/enums/stateMachine/ReferenceManagerState';
import DigitalResourceType from '@/enums/DigitalResourceType';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import NonAcademicResource from '@/interfaces/sciwheel/NonAcademicResource';
import ReferenceManagerReactContext from '@/components/Context/ReferenceManagerReactContext';
import ReferenceManagerNotSupported from '@/components/SideTray/ReferenceManager/ReferenceManagerNotSupported';
import SinglePage from '@/components/SideTray/ReferenceManager/SinglePage';
import SearchPage from '@/components/SideTray/ReferenceManager/SearchPage';
import ReferenceManagerNoUser from '@/components/SideTray/ReferenceManager/ReferenceManagerNoUser';
import useTabVisibility from '@/hooks/useTabVisibility';
import ReferenceManagerEvent from '@/enums/stateMachine/ReferenceManagerEvent';
import { store } from '@/store';

/**
 * @returns {JSX.Element}
 * @constructor
 */
const ReferenceManagerTab = () => {
  const isTabActive = useTabVisibility();
  const { fetchUser } = browserMethods.app.contentScript;
  const storeState = store.getState();
  const { user } = storeState;
  const {
    referenceManager, resources, referenceResource, sendReferenceManagerState,
  } = useContext(ReferenceManagerReactContext);
  const { digitalResources, nonAcademicResources, citedArticles } = resources;
  const article: DigitalResource & NonAcademicResource = referenceResource
   || digitalResources.filter(resource => resource.type === DigitalResourceType.Article)[0]
    || digitalResources[0] || nonAcademicResources[0];

  const getUser = async () => {
    const { storeState: { user: storeUser } } = await fetchUser();
    if (!user?.id) {
      store.setState({ user: storeUser });
    }

    if (user?.id || storeUser?.id) {
      sendReferenceManagerState(ReferenceManagerEvent.On);
    }
  };

  useEffect(() => {
    if (isTabActive && referenceManager === ReferenceManagerState.NoUserSelected) {
      getUser();
    }
  }, [isTabActive]);

  useEffect(() => {
    if (referenceManager === ReferenceManagerState.SignOut) {
      sendReferenceManagerState(ReferenceManagerEvent.NoUserSelected);
    }
    if (user?.id && referenceManager === ReferenceManagerState.Login) {
      sendReferenceManagerState(ReferenceManagerEvent.CheckForUserSignIn);
    }
  }, [referenceManager]);

  if (referenceManager === ReferenceManagerState.NoUserSelected) {
    return (<ReferenceManagerNoUser />);
  }

  if (referenceManager === ReferenceManagerState.ReferenceSinglePage
    || referenceManager === ReferenceManagerState.ReferenceNonAcademic) {
    return (<SinglePage article={article} digitalResources={digitalResources} citedArticles={citedArticles} />);
  }

  if (referenceManager === ReferenceManagerState.ReferenceSearchResults) {
    return (<SearchPage digitalResources={digitalResources} />);
  }

  // referenceManager === ReferenceManagerState.NotSupported
  return <ReferenceManagerNotSupported />;
};

export default ReferenceManagerTab;
