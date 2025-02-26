import React from 'react';
import browserMethods from '@/browserMethods';
import bootstrap from '@bootstrap/index';
import workspaceIntro from '@/assets/video/workspace_intro.webm';
import Button from '@/subComponents/Buttons/Button';

const ReferenceManagerVideo = () => {
  return (
    <div>
      <h1 className="hidden-text">Do more with Sciwheel</h1>
      <video className="video reference-manager__video" autoPlay loop muted>
        <source src={browserMethods.runtime.getURL(workspaceIntro)} type="video/webm" />
      </video>
    </div>
  );
};

const ReferenceManagerOnboarding = () => {
  return (
    <div className="reference-manager--no-user">
      <ReferenceManagerVideo />
      <div className="action__wrapper">
        <Button
          className="button button-primary"
          onClick={() => window.open(`${bootstrap.api.sciwheel.base}/work/signin`, '_blank', 'noopener,noreferrer')}
          text="Sign-up"
        />
        <Button
          className="button button-neutral"
          onClick={() => window.open(`${bootstrap.api.sciwheel.base}/work/signin`, '_blank', 'noopener,noreferrer')}
          text="I already have an account"
        />
      </div>
    </div>
  );
};

export { ReferenceManagerOnboarding, ReferenceManagerVideo };
