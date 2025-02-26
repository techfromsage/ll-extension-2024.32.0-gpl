import StatFutures from '@/interfaces/StatEventsFutures';
import Options from '@/interfaces/http/Options';
import FuturesStatType from '@/enums/FuturesStatType';

const futuresEventPathMap = {
  [FuturesStatType.LibrarySearchShown]: { path: '/library-searches/stats/shown', method: 'POST' },
  [FuturesStatType.OnboardingShown]: { path: '/onboardings/stats/shown', method: 'POST' },
  [FuturesStatType.CampaignShown]: { path: '/nps/stats/shown', method: 'POST' },
  [FuturesStatType.SurveyShown]: { path: '/surveys/stats/shown', method: 'POST' },
  [FuturesStatType.FaqShown]: { path: '/faqs/stats/shown', method: 'POST' },
  [FuturesStatType.LibrarySearchClicked]: { path: '/library-searches/stats/clicked', method: 'POST' },
  [FuturesStatType.FaqClicked]: { path: '/faqs/stats/clicked', method: 'POST' },
  [FuturesStatType.OnboardingMarkAsRead]: { path: '/onboardings/stats/read', method: 'POST' },
  [FuturesStatType.OnboardingMarkAsUnread]: { path: '/onboardings/stats/read', method: 'DELETE' },
  [FuturesStatType.SurveyMarkAsRead]: { path: '/surveys/stats/read', method: 'POST' },
  [FuturesStatType.SurveyMarkAsUnread]: { path: '/surveys/stats/read', method: 'DELETE' },
  [FuturesStatType.KeywordEnhancementHovered]: { path: '/keyword-enhancement/stats/hovered', method: 'POST' },
  [FuturesStatType.KeywordEnhancementClicked]: { path: '/keyword-enhancement/stats/clicked', method: 'POST' },
  [FuturesStatType.LibChatClicked]: { path: '/libchat/stats/clicked', method: 'POST' },
  [FuturesStatType.CourseCompleted]: { path: '/onboardings/stats/certificate-download', method: 'POST' },
  // non-futures stats
  [FuturesStatType.PrintHoldingsClick]: { path: '/print-holdings/click', method: 'POST' },
  [FuturesStatType.InstitutionInstalled]: { path: '/users/stats/installed', method: 'POST' },
  [FuturesStatType.CitationsClick]: { path: '/citation/click', method: 'POST' },
  [FuturesStatType.CitationsCopy]: { path: '/citation/copy', method: 'POST' },
};

export default (
  httpClient: <Response>(path: string, method: string, options: Options) => Promise<Response>,
  events: StatFutures[],
  clearStatEvents: () => void,
) => {
  if (!events.length) {
    return Promise.resolve();
  }
  return events.reduce(
    async (_, stat: StatFutures) => {
      const { path, method } = futuresEventPathMap[stat.type];
      await httpClient<string>(path, method, { body: JSON.stringify(stat) })
        .catch(() => 'error in request');
    },
    Promise.resolve(),
  ).then(() => clearStatEvents());
};
