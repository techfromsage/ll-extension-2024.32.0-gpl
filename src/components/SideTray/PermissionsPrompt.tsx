import React from 'react';
import browserMethods from '@/browserMethods';
import placeholderLogo from '@/assets/svg/placeholderLogo.svg';
import Logo from '@/subComponents/Logo/Logo';
import Link from '@/subComponents/Link/Link';
import Button from '@/subComponents/Buttons/Button';

interface Props {
  isToolbar?: boolean,
}

const PermissionsPrompt = ({ isToolbar } : Props) => {
  return (
    <div style={isToolbar ? { minHeight: '250px', minWidth: '450px', padding: '24px' } : { minHeight: '500px' }}>
      <div className={isToolbar ? 'layout--permissions-prompt' : 'layout layout--permissions-prompt'}>
        <Logo
          src={browserMethods.runtime.getURL(placeholderLogo)}
          type="sidetray"
          alt="Lean Library Logo"
        />
        <h1 className="heading">Permissions request</h1>
        <p className="body">
          To allow Lean Library to work we request permission to access your page data.
          We never track, collect, or store you data.
          Please see our&nbsp;
          <Link href="https://technologyfromsage.com/legal/privacy-policy/" text="privacy policy" />
          &nbsp;on how we use this data.
        </p>
        <Button
          className="button-primary"
          onClick={() => {
            browserMethods.permissions.background.request({ origins: ['<all_urls>'] }).then(granted => {
              if (granted) {
                window.location.reload();
              }
            });
          }}
          text="Review permission"
        />
      </div>
    </div>
  );
};

export default PermissionsPrompt;
