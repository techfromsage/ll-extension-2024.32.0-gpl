import React, { useContext, useEffect, useState } from 'react';
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import { Campaign } from '@/interfaces/libraryResources/Campaign';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import CampaignQuestion from '@/subComponents/Campaign/CampaignQuestion';
import submitAnswers from '@/subComponents/Campaign/submitAnswers';
import Button from '@/subComponents/Buttons/Button';
import AppActiveEvent from '@/enums/stateMachine/AppActiveEvent';
import Loading from '@/components/App/Loading';
import browserMethods from '@/browserMethods';

interface Props {
  notification: NotificationUI,
}

export interface Answers {
  [questionUuid: string]: number | string,
}

const CampaignContent = ({ notification }: Props) => {
  const { sendAppActiveState, storeState: { clientId, config } } = useContext(AppActiveReactContext);
  const { sendLayoutState, addToClosedHistory } = useContext(LayoutReactContext);
  const [campaignContent, setCampaignContent] = useState<Campaign>();
  const [campaignLoadFailed, setCampaignLoadFailed] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [answers, setAnswer] = useState<Answers>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { httpRequest } = browserMethods.app.contentScript;

  useEffect(() => {
    setIsLoading(true);
    // fetch campaign content
    httpRequest<{ campaign: Campaign | undefined } >({
      method: 'get',
      url: `${config?.api.campaignItem.replace(/{uuid}/g, notification.id.toString())}`,
    }).then(({ campaign }) => {
      setIsLoading(false);
      if (campaign) {
        setCampaignContent(campaign);
        return;
      }
      setCampaignLoadFailed(true);
    }).catch(() => Promise.resolve(undefined));
  }, []);

  const setAnswerHandler = (questionId: string, value: string) => {
    setAnswer({
      ...answers,
      [questionId]: value,
    });
  };

  const submitCampaignAnswers = () => {
    submitAnswers(
      window.location.href,
      notification.institution.id,
      notification.id.toString(),
      clientId,
      answers,
    ).then(() => {
      setSubmitMessage('Thank you for your response');
      setSubmitSuccess(true);

      setTimeout(() => {
        addToClosedHistory(notification);
        sendAppActiveState(AppActiveEvent.RedeterminePage);
        sendLayoutState(LayoutEvent.Close);
      }, 3000);
    }).catch(() => {
      setSubmitMessage('Something went wrong, please try again');
      setSubmitSuccess(false);
    });
  };

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerHandler(event.target.name, event.target.value);
  };

  const buttonIsEnabled = () => {
    const allQuestionsAnswered = Object.keys(answers).length === campaignContent?.questions.length;
    const alreadySuccessfullySubmitted = submitSuccess;

    // if all questions are answered, and it hasn't already been submitted, then the button should become enabled
    return allQuestionsAnswered && !alreadySuccessfullySubmitted;
  };

  return isLoading
    ? <Loading />
    : (
      <div className="campaign__content" data-testid="CampaignContent">
        {campaignLoadFailed && (
          <div>
            <h1 data-testid="NotificationHeading" className="notification__title--popup">{notification.title}</h1>
            <p>The campaign failed to load. Please try again later.</p>
          </div>
        )}
        {!campaignLoadFailed && (
          <div>
            <h1 data-testid="NotificationHeading" className="notification__title--popup">{campaignContent?.name}</h1>
            {
              campaignContent?.questions.map((question, index) => (
                <CampaignQuestion
                  key={index}
                  firstItem={index === 0}
                  question={question}
                  answers={answers}
                  onChangeValue={onChangeValue}
                />
              ))
            }
            <Button
              className="button-primary"
              disabled={!buttonIsEnabled()}
              onClick={() => submitCampaignAnswers()}
              text="Submit"
            />
            {submitMessage.length > 0 && <p>{submitMessage}</p>}
          </div>
        )}
      </div>
    );
};

export default CampaignContent;
