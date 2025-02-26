import bootstrap from '@bootstrap/index';
import { Answers } from '@/subComponents/Campaign/CampaignContent';
import browserMethods from '@/browserMethods';

export default (triggerUrl: string, institutionId: string, campaignUuid: string, clientId: string, answers: Answers) => {
  const { httpRequest } = browserMethods.app.contentScript;
  return httpRequest({
    method: 'post',
    url: `${bootstrap.api.llApi.url}/nps`,
    headers: {
      Authorization: `Bearer ${bootstrap.api.llApi.token}`,
    },
    body: JSON.stringify({
      trigger_url: triggerUrl,
      institute_id: institutionId,
      module_uuid: campaignUuid,
      uuid: clientId,
      answers,
    }),
  });
};
