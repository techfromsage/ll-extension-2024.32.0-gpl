import React, { useContext } from 'react';
import SettingsFormReactContext from '@/components/Context/SettingsFormReactContext';
import Alert from '@/subComponents/Alert/Alert';

interface Props {
  children: JSX.Element | JSX.Element[],
  type?: 'select' | 'switch' | 'switch-table',
  title?: string,
  helpText?: string,
  alertKey?: string,
  extra?: string | JSX.Element,
  htmlFor?: string,
  noMargin?: boolean,
}

const FormElement = ({
  title, type, children, extra, htmlFor, alertKey, helpText, noMargin,
}: Props) => {
  const { settingsFormData } = useContext(SettingsFormReactContext);
  const alertItem = settingsFormData.alert.find(([name]) => name === alertKey);

  const classes = [
    'form-element',
    type && `form-element--${type}`,
    noMargin && 'form-element--no-margin-bottom',
  ].filter(Boolean);

  return (
    <>
      {!!title && <label htmlFor={htmlFor} className="form-element__title">{title}</label>}
      {!!helpText && <p className="form__help-text">{helpText}</p>}
      <div className={classes.join(' ')}>
        <div className={['form-element__item', type && `form-element__item--${type}`].filter(Boolean).join(' ')}>
          {children}
        </div>
        <div className="form-element__extra">
          {extra || ' '}
        </div>
        <div className="form-element__alert">
          {!!alertItem && <Alert message={alertItem[1]} />}
        </div>
      </div>
    </>
  );
};

export default FormElement;
