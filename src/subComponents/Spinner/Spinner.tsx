/**
 * Generic loading spinner
 */
import React, { CSSProperties, useContext } from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto 0.6rem auto',
};

interface Props {
  loading: boolean,
  ariaLabel?: string,
  text?: string,
}

const Spinner = ({ loading, text, ariaLabel }: Props) => {
  const { storeState: { appSettings: { customizations } } } = useContext(AppActiveReactContext);

  return (
    <div className="spinner">
      <div>
        <BounceLoader
          loading={loading}
          color={customizations.primary_button_color}
          cssOverride={override}
          size={30}
          aria-label={ariaLabel}
          data-testid="LoadingSpinner"
        />
        {text && (<p>{text}</p>)}
      </div>
    </div>
  );
};

export default Spinner;
