import React, { useContext } from 'react';
import Link from '@/subComponents/Link/Link';
import Button from '@/subComponents/Buttons/Button';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import browserMethods from '@/browserMethods';
import FuturesStatType from '@/enums/FuturesStatType';
import useTooltipWrapperContext from './useTooltipWrapperContext';

interface Props {
  packageName: string,
  description: string,
  title: string,
  link: string,
  logo?: string | null,
  buttonText?: string | null,
  keywordPackageUuid: string,
}

const Tooltip = ({
  logo,
  packageName,
  title,
  description,
  link,
  buttonText,
  keywordPackageUuid,
}: Props) => {
  const { setOpen } = useTooltipWrapperContext();
  const { storeState: { appSettings, institutes } } = useContext(AppActiveReactContext);
  const { layoutValues } = useContext(LayoutReactContext);

  const onClose = () => {
    setOpen(false);
  };

  const onClick = () => browserMethods.app.statEventFutures({
    type: FuturesStatType.KeywordEnhancementClicked,
    module_uuid: keywordPackageUuid,
    trigger_url: window.location.href,
    institute_id: institutes[0].id,
  });

  return (
    <div className={layoutValues.screenSize}>
      <div className={appSettings.customTextSize}>
        <div className="tooltip">
          <div className="tooltip__header">
            {logo && <img src={logo} alt="" />}
          </div>
          <div className="tooltip__package-name">
            {packageName}
          </div>
          <div className="tooltip__title">
            {title}
          </div>
          <div className="tooltip__description">
            {description}
          </div>
          <div className="tooltip__link">
            <Link
              onClick={onClick}
              href={link}
              text={buttonText || 'Read more'}
            />
          </div>
          <Button
            className="close"
            hiddenText
            onClick={() => {
              if (onClose) {
                onClose();
              }
            }}
            text="Close tooltip"
          />
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
