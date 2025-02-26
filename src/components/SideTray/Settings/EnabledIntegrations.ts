import logoScite from '@/assets/svg/logoScite.svg';
import AppSettings from '@/interfaces/AppSettings';
import { AdvancedCardItem } from '@/subComponents/AdvancedCard/AdvancedCard';

const EnabledIntegrations = (enabledIntegration: string[], appSettings: AppSettings): AdvancedCardItem[] => {
  const integrationData: AdvancedCardItem[] = [
    {
      id: 'scite',
      title: 'Scite.Ai',
      description: 'Smart Citation badges from Scite show how a paper has been cited.',
      logo: logoScite,
      url: 'https://scite.ai/',
      options: [
        {
          type: 'switch',
          label: 'Display badges on Google Scholar results',
          value: appSettings.integrations.scite.googleScholar,
          name: 'integrations.scite.googleScholar',
          disabled: !appSettings.integrations.scite.enabled,
        },
        {
          type: 'switch',
          label: 'Display badges on publisher websites',
          value: appSettings.integrations.scite.elsewhere,
          name: 'integrations.scite.elsewhere',
          disabled: !appSettings.integrations.scite.enabled,
        },
      ],
    },
    {
      id: 'citation',
      title: 'Citation',
      description: `Our Citation feature helps you to easily generate and copy
      the right reference from a journal article, which you can then use in an assignment.`,
      url: 'https://leanlibrary.zendesk.com/hc/en-gb/articles/17195308223645-Lean-Library-Cite-What-is-it',
    },
  ];
  return integrationData.filter(({ id }) => enabledIntegration.includes(id));
};

export default EnabledIntegrations;
