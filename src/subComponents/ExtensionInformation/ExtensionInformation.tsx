import React, { useContext, useState } from 'react';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import Button from '@/subComponents/Buttons/Button';
import extensionInformation from '@/dev/extensionInformation';

const ExtensionInformation = () => {
  const { storeState } = useContext(AppActiveReactContext);
  const [copying, setCopying] = useState(false);
  const items = extensionInformation(storeState);
  const hasClipboard = 'clipboard' in navigator;

  const copyToClipboard = async () => {
    setCopying(true);
    if (hasClipboard) {
      const text = items.map(item => item.join(': ')).join('\n');
      navigator.clipboard.writeText(text).then(() => {
        setTimeout(() => setCopying(false), 2000);
      });
    }
  };

  const copyText = copying ? 'Copied!' : 'Copy to clipboard';

  return (
    <>
      <ul className="list--unstyled text-size--medium color--mid-gray">
        { items.map((item, index) => (
          <li key={`extension-info-${index}`}>
            <strong>
              { item[0] }
              :
              {' '}
            </strong>
            { item[1] }
          </li>
        )) }
      </ul>
      { hasClipboard
        && (
        <div className="text--right">
          <Button
            className="button-as-link"
            disabled={copying}
            onClick={copyToClipboard}
            text={copyText}
          />
        </div>
        )}
    </>
  );
};

export default ExtensionInformation;
