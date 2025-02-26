import React from 'react';

interface Props {
  text: string | undefined,
  icon?: JSX.Element,
  testId?: string,
}

const InformationPip = ({ text, icon, testId }: Props) => {
  if (!text) {
    return <></>;
  }

  return (
    <div className="information-pip__wrapper">
      <div className="information-pip">
        { icon }
        <span data-testid={testId}>{ text }</span>
      </div>
    </div>
  );
};

export default InformationPip;
