import React, { useContext, useEffect, useState } from 'react';
import bootstrap from '@bootstrap/index';
import browserMethods from '@/browserMethods';
import Button from '@/subComponents/Buttons/Button';
import ReferenceManagerReactContext from '@/components/Context/ReferenceManagerReactContext';
import ReferenceManagerState from '@/enums/stateMachine/ReferenceManagerState';
import { SciwheelUser } from '@/interfaces/sciwheel/SciwheelUser';
import ReferenceManagerEvent from '@/enums/stateMachine/ReferenceManagerEvent';
import useTabVisibility from '@/hooks/useTabVisibility';
import Loading from '@/components/App/Loading';
import { store } from '@/store';

const SettingsSciwheel = () => {
  const storeState = store.getState();
  const { user } = storeState;
  const [sciwheelUser, setSciwheelUser] = useState<SciwheelUser | null>();
  const isTabActive = useTabVisibility();
  const { referenceManager, sendReferenceManagerState } = useContext(ReferenceManagerReactContext);
  const { fetchUser } = browserMethods.app.contentScript;

  const onSciwheelSignInClick = () => {
    browserMethods.tabs.contentScript.create(`${bootstrap.api.sciwheel.base}/work/signin`);
  };

  const onSciwheelSettingsClick = () => {
    browserMethods.tabs.contentScript.create(`${bootstrap.api.sciwheel.base}/#/profile/edit/`);
  };

  const onSciwheelSignOutClick = () => {
    if (user?.id || sciwheelUser?.id) {
      store.setState({ user: undefined });
      setSciwheelUser(null);
      sendReferenceManagerState(ReferenceManagerEvent.SignOut);
    }
  };

  // eslint-disable-next-line
  useEffect(() => {
    if (user?.id && referenceManager === ReferenceManagerState.NoUserSelected) {
      sendReferenceManagerState(ReferenceManagerEvent.Login);
    }
    if (!user?.id && referenceManager === ReferenceManagerState.NoUserSelected) {
      const abortController = new AbortController(); // create AbortController
      const getUser = async () => {
        try {
          const { storeState: { user: storeUser } } = await fetchUser();
          if (!abortController.signal.aborted) { // check if the fetch has been aborted
            setSciwheelUser(storeUser);
            const noStoreUserDetected = !storeUser?.id && !user?.id;
            if (noStoreUserDetected) {
              sendReferenceManagerState(ReferenceManagerEvent.NoUserSelected);
            } else {
              store.setState({ user: storeUser });
              sendReferenceManagerState(ReferenceManagerEvent.CheckForUserSignIn);
            }
          }
        } catch (error) {
          if (abortController.signal.aborted) {
            console.log('Fetch aborted'); // handle the abort case
          } else {
            throw error;
          }
        }
      };

      if (isTabActive && (!user?.id)) {
        getUser();
      }
      return () => {
        abortController.abort(); // abort on cleanup
      };
    }
    return undefined; // Ensure a value is returned at the end
  }, [isTabActive, user]);

  useEffect(() => {
    if (referenceManager === ReferenceManagerState.SignOut) {
      sendReferenceManagerState(ReferenceManagerEvent.NoUserSelected);
    }
  }, [referenceManager]);

  if (referenceManager === ReferenceManagerState.NoUserSelected) {
    return (
      <Button
        className="button-primary"
        onClick={onSciwheelSignInClick}
        text="Sign-in or Sign-up"
      />
    );
  }

  if (!user?.id && !sciwheelUser?.id) {
    return <Loading />;
  }

  return (
    <div className="advanced-card advanced-card--sciwheel">
      <div className="advanced-card__status">
        <h4 className="advanced-card__heading">Account information</h4>
        <Button
          className="button-neutral button-small button--no-margin"
          onClick={onSciwheelSignOutClick}
          text="Sign out"
        />
      </div>
      <div className="advanced-card__main">
        <div className="advanced-card__body">
          <p>
            First name
            <span data-testid="UserFirstName">{`${user?.firstName || sciwheelUser?.firstName}`}</span>
          </p>
          <p>
            Last name
            <span data-testid="UserLastName">{`${user?.lastName || sciwheelUser?.lastName}`}</span>
          </p>
          <Button
            className="button-as-link-secondary"
            onClick={onSciwheelSettingsClick}
            text="Manage Sciwheel settings"
            buttonType="newtab"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsSciwheel;
