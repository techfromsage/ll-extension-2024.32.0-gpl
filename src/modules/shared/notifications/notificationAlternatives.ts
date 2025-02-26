import NotificationUI, { NotificationUIButtonLevel } from '@/interfaces/ui/NotificationUI';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import Feature from '@/enums/Feature';
import State from '@/enums/State';
import Content from '@/modules/shared/Content';
import Timeout from '@/modules/shared/Timeout';
import NotificationHash from '@/modules/shared/notifications/NotificationHash';
import AutoOpen from '@/modules/shared/notifications/AutoOpen';
import Logo from '@/modules/shared/InstituteLogo';
import OpenAccessInfo from '@/modules/shared/notifications/OpenAccessInfo';
import GeneratePrintHoldingsLink from '@/modules/shared/notifications/GeneratePrintHoldingsLink';
import DigitalResourceType from '@/enums/DigitalResourceType';
import Notification from '@/enums/Notification';

export default (
  stateToFind: State,
  content: { title: string, message: string, button: string },
) => (context: FeaturesContext): NotificationUI[] => {
  const alternative = context.alternativeURLs.find(({ state }) => (state === stateToFind));
  const { institution, type } = alternative || {};
  if (!alternative?.urls || !institution) {
    throw new Error('No alternative found');
  }
  const [url] = alternative.urls;
  const id = NotificationHash(Notification.Alternatives, context.currentUrl).generate();
  const autoOpen = AutoOpen(institution, stateToFind, id, context);

  const isEbook = type === DigitalResourceType.EBook;
  const printHoldingsLink = isEbook && !institution.alternatives.print_book_alternatives.holdings_lookup_enabled
    && GeneratePrintHoldingsLink(institution, alternative.identifier, alternative.isbnMetadata?.relatedIsbns);

  const buttons = [
    {
      text: 'Get citation',
      url,
      level: NotificationUIButtonLevel.Secondary,
    },
    {
      text: Content(institution.id, content.button),
      url,
    },
    ...(printHoldingsLink ? [{
      text: 'Check for print',
      url: printHoldingsLink,
      level: NotificationUIButtonLevel.Tertiary,
    }] : []),
  ];

  return [{
    id,
    institution,
    title: Content(institution.id, content.title),
    message: Content(institution.id, content.message),
    // return cards if printHoldingsLink is available, otherwise return buttons
    ...(isEbook ? {
      cards: [{
        title: alternative.metadata?.articleTitle || alternative.title || '',
        buttons,
      }],
    } : { buttons }),
    state: stateToFind,
    feature: Feature.Alternatives,
    timeOut: Timeout(institution, stateToFind),
    autoOpen,
    logo: Logo(institution),
    openAccess: OpenAccessInfo(alternative, institution),
    metadata: {
      digitalResource: alternative,
      linkType: stateToFind,
    },
  }];
};
