import React, { useContext } from 'react';
import Alert from '@/subComponents/Alert/Alert';
import CheckCircleIcon from '@/icons/CheckCircleIcon';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import HighlightAndAnnotateEvent from '@/enums/stateMachine/HighlightAndAnnotateEvent';
import UndoIcon from '@/icons/UndoIcon';
import WarningTriangleIcon from '@/icons/WarningTriangleIcon';
import ComponentType from '@/enums/ui/ComponentType';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import HighlightAndAnnotateReactContext from '@/components/Context/HighlightAndAnnotateReactContext';

const generateIcon = (icon: string | undefined) => {
  if (!icon) {
    return undefined;
  }

  const iconMap: { [key: string]: JSX.Element } = {
    check: <CheckCircleIcon fill="#2F7037" />,
    warning: <WarningTriangleIcon />,
  };

  return iconMap[icon] || undefined;
};

const HighlightAndAnnotateAlert = () => {
  const { storeState: { appSettings } } = useContext(AppActiveReactContext);
  const { layoutValues } = useContext(LayoutReactContext);
  const { highlightAndAnnotateData: { alert }, sendHighlightAndAnnotateState } = useContext(HighlightAndAnnotateReactContext);

  if (!alert?.length) {
    return null;
  }

  const alertContent = alert.map(alertItem => {
    return {
      type: alertItem?.type as ComponentType || ComponentType.Success,
      icon: generateIcon(alertItem.icon),
      message: alertItem.button ? (
        <>
          {alertItem.message}
          <button
            type="button"
            onClick={() => {
              window.stateInterpreterSettingsForm.send(
                SettingsFormEvent.Submit,
                { name: 'highlightAndAnnotateEnabled', value: [true] },
              );
              sendHighlightAndAnnotateState(HighlightAndAnnotateEvent.TurnOn);
            }}
            className="button-inline button-undo"
          >
            {alertItem.button}
            <UndoIcon />
          </button>
        </>
      ) : alertItem.message,
    };
  });

  return alert && (
    <div className={layoutValues.screenSize}>
      <div className={appSettings.customTextSize}>
        <div className="alert-wrapper">
          <Alert
            className="alert--wide"
            type={alertContent[0].type}
            icon={alertContent[0].icon}
            message={alertContent[0].message}
          />
        </div>
      </div>
    </div>
  );
};

export default HighlightAndAnnotateAlert;
