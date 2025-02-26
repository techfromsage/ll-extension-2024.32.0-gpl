import React from 'react';
import { Question } from '@/interfaces/libraryResources/Campaign';
import CampaignRadio from '@/subComponents/Campaign/CampaignRadio';
import { Answers } from '@/subComponents/Campaign/CampaignContent';

interface Props {
  firstItem: boolean,
  question: Question,
  answers: Answers,
  onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const CampaignQuestion = ({
  firstItem, question, answers, onChangeValue,
}: Props) => {
  const feedbackCount = 5;

  return (
    <div className="campaign__question">
      <h3>{ question.question }</h3>
      <p>{ question.comment }</p>
      { firstItem && (
      <div className="campaign__answers__key">
        <span>Very unlikely</span>
        <span>Very likely</span>
      </div>
      )}
      <div
        className="campaign__answers"
        onChange={onChangeValue}
      >
        { Array.from({ length: feedbackCount }).map((e, index) => (
          <CampaignRadio
            key={index}
            name={question.uuid}
            value={`${index + 1}`}
            checked={answers[question.uuid] === (index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default CampaignQuestion;
