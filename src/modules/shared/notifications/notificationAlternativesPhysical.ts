import NotificationUI, { NotificationUIButtonLevel } from '@/interfaces/ui/NotificationUI';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import Feature from '@/enums/Feature';
import State from '@/enums/State';
import Content from '@/modules/shared/Content';
import Timeout from '@/modules/shared/Timeout';
import NotificationHash from '@/modules/shared/notifications/NotificationHash';
import AutoOpen from '@/modules/shared/notifications/AutoOpen';
import Logo from '@/modules/shared/InstituteLogo';

export default (
  stateToFind: State,
  content: { title: string, message: string, button: string },
) => (context: FeaturesContext): NotificationUI[] => {
  const alternative = context.alternativeURLs.find(({ state }) => (state === stateToFind));

  const { institution, title } = alternative || {};
  if (!alternative?.urls || !institution) {
    throw new Error('No physical alternative found');
  }
  const [url] = alternative.urls;
  const id = NotificationHash(alternative, context.currentUrl).generate();
  const autoOpen = AutoOpen(institution, stateToFind, id, context);

  const cards = [{
    title: title || '',
    buttons: [{
      text: 'Get citation',
      url,
      level: NotificationUIButtonLevel.Secondary,
    },
    {
      text: Content(institution.id, content.button),
      url,
    }],
  }];

  return [{
    id,
    institution,
    title: Content(institution.id, content.title),
    message: Content(institution.id, content.message),
    cards,
    state: stateToFind,
    feature: Feature.AlternativesPhysical,
    timeOut: Timeout(institution, stateToFind),
    autoOpen,
    logo: Logo(institution),
    metadata: {
      digitalResource: alternative,
      linkType: stateToFind,
    },
  }];
};
