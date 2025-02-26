import NotificationUI, {
  NotificationUIButtonLevel,
  NotificationUICard,
} from '@/interfaces/ui/NotificationUI';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import Feature from '@/enums/Feature';
import State from '@/enums/State';
import DigitalResourceType from '@/enums/DigitalResourceType';
import Content from '@/modules/shared/Content';
import Timeout from '@/modules/shared/Timeout';
import NotificationHash from '@/modules/shared/notifications/NotificationHash';
import AutoOpen from '@/modules/shared/notifications/AutoOpen';
import Institution from '@/interfaces/Institution';
import Logo from '@/modules/shared/InstituteLogo';
import GeneratePrintHoldingsLink from '@/modules/shared/notifications/GeneratePrintHoldingsLink';
import Notification from '@/enums/Notification';

export default (
  state: State.EbookFinderMultiple | State.EbookFinder,
  content: { title: string, message: string, button: string },
) => (context: FeaturesContext): NotificationUI[] => {
  const alternative = context.alternativeURLs.find(({ type }) => (type === DigitalResourceType.EBook));
  const { institution } = alternative || {};

  if (!alternative?.urls || !institution) {
    throw new Error('No alternative found');
  }

  const cards: NotificationUICard[] = [];

  context.alternativeURLs.forEach(ebook => {
    if (ebook.state === State.EbookFinder
      && ebook.urls.length > 0
      && (ebook.institution as Institution).id === institution.id) {
      const printHoldingsLink = !institution.alternatives.print_book_alternatives.holdings_lookup_enabled
        && GeneratePrintHoldingsLink(institution, ebook.identifier, ebook.isbnMetadata?.relatedIsbns);

      cards.push({
        title: ebook.title || '',
        buttons: [
          {
            text: 'Get citation',
            url: ebook.urls[0],
            level: NotificationUIButtonLevel.Secondary,
          },
          {
            text: 'Go to ebook',
            url: ebook.urls[0],
          },
          ...(printHoldingsLink ? [{
            text: 'Check for print',
            url: printHoldingsLink,
            level: NotificationUIButtonLevel.Tertiary,
          }] : []),
        ],
      });
    }
  });

  const id = NotificationHash(Notification.Ebooks, context.currentUrl).generate();
  const autoOpen = AutoOpen(institution, state, id, context);

  return [{
    id,
    institution,
    title: Content(institution.id, content.title),
    message: Content(institution.id, content.message),
    cards,
    state,
    feature: Feature.Alternatives,
    timeOut: Timeout(institution, state),
    autoOpen,
    logo: Logo(institution),
    metadata: {
      linkType: State.EbookFinder,
      digitalResource: alternative,
    },
  }];
};
