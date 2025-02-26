/**
 * Notification factory provides the relevant NotificationUI based on the achieved state.
 */
import NotificationUI from '@/interfaces/ui/NotificationUI';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import State from '@/enums/State';
import Feature from '@/enums/Feature';
import RedirectType from '@/enums/RedirectType';
import DigitalResourceType from '@/enums/DigitalResourceType';
import ResourceDomainTypes from '@/enums/ResourceDomainTypes';
import notificationAssist from '@/modules/shared/notifications/notificationAssist';
import notificationSystemMessage from '@/modules/shared/notifications/notificationSystemMessage';
import notificationAlternatives from '@/modules/shared/notifications/notificationAlternatives';
import notificationAlternativesAchieved from '@/modules/shared/notifications/notificationAlternativesAchieved';
import notificationOnCampusSupported from '@/modules/shared/notifications/notificationOnCampusSupported';
import notificationAccessPossible from '@/modules/shared/notifications/notificationAccessPossible';
import notificationAccessAchieved from '@/modules/shared/notifications/notificationAccessAchieved';
import notificationConnected from '@/modules/shared/notifications/notificationConnected';
import notificationRedirected from '@/modules/shared/notifications/notificationRedirected';
import notificationEbooks from '@/modules/shared/notifications/notificationEbooks';
import notificationModal from '@/modules/shared/notifications/notificationModal';
import notificationCampaign from '@/modules/shared/notifications/notificationCampaign';
import notificationOnCampusNotSupported from '@/modules/shared/notifications/notificationOnCampusNotSupported';
import notificationAlternativesPhysical from '@/modules/shared/notifications/notificationAlternativesPhysical';

export default (context: FeaturesContext, state: State, feature: Feature):() => NotificationUI[] => {
  const notifications: { [state: string]: () => NotificationUI[] } = {
    // Assist
    [State.PriorityAssist]: () => notificationAssist(context, state),
    [State.Assist]: () => notificationAssist(context, state),
    [State.SystemMessage]: () => notificationSystemMessage(context, state),
    // Alternatives
    [State.FullTextFinder]: () => notificationAlternatives(
      State.FullTextFinder,
      {
        title: 'titleFullTextFinder',
        message: 'contentFullTextFinder',
        button: 'buttonFullTextFinder',
      },
    )(context),
    [State.OpenAccess]: () => notificationAlternatives(State.OpenAccess, {
      title: 'titleOpenAccess',
      message: 'contentOpenAccess',
      button: 'buttonOpenAccess',
    })(context),
    [State.OpenAccessEbook]: () => notificationAlternatives(State.OpenAccessEbook, {
      title: 'titleOpenAccessEbook',
      message: 'contentOpenAccessEbook',
      button: 'buttonOpenAccessEbook',
    })(context),
    [State.EbookFinder]: () => notificationEbooks(State.EbookFinder, {
      title: 'titleEbookFinder',
      message: 'contentEbookFinder',
      button: 'buttonEbookFinder',
    })(context),
    [State.EbookFinderMultiple]: () => notificationEbooks(State.EbookFinderMultiple, {
      title: 'titleEbookFinderMultiple',
      message: 'contentEbookFinderMultiple',
      button: 'buttonEbookFinder',
    })(context),
    [State.PrintBookAvailable]: () => notificationAlternativesPhysical(State.PrintBookAvailable, {
      title: 'titlePrintBook',
      message: 'contentPrintBook',
      button: 'buttonPrintBook',
    })(context),
    [State.OrderForm]: () => notificationAlternatives(State.OrderForm, {
      title: 'titleOrderForm',
      message: 'contentOrderForm',
      button: 'buttonOrderForm',
    })(context),
    [State.OnCampusSupported]: () => notificationOnCampusSupported()(context, state, feature),
    [State.FullTextFinderAchieved]: () => notificationAlternativesAchieved(
      DigitalResourceType.Article,
      State.FullTextFinder,
      { title: 'titleFullTextFinderAchieved', message: 'contentFullTextFinderAchieved' },
    )(context, state),
    [State.OpenAccessAchieved]: () => notificationAlternativesAchieved(
      [DigitalResourceType.Article, DigitalResourceType.EBook],
      [State.OpenAccess, State.OpenAccessEbook],
      { title: 'titleOpenAccessAchieved', message: 'contentOpenAccessAchieved' },
    )(context, state),
    [State.EbookFinderAchieved]: () => notificationAlternativesAchieved(
      DigitalResourceType.EBook,
      State.EbookFinder,
      {
        title: 'titleEbookFinderAchieved',
        message: 'contentEbookFinderAchieved',
      },
    )(context, state),
    // Access
    [State.OpenAthensAccessPossible]: () => notificationAccessPossible(
      ResourceDomainTypes.OpenAthens,
      {
        title: 'titleOpenAthensAccessPossible',
        message: 'contentOpenAthensAccessPossible',
        button: 'buttonOpenAthensAccessPossible',
      },
    )(context, state),
    [State.ShibbolethAccessPossible]: () => notificationAccessPossible(
      ResourceDomainTypes.Shibboleth,
      {
        title: 'titleShibbolethAccessPossible',
        message: 'contentShibbolethAccessPossible',
        button: 'buttonShibbolethAccessPossible',
      },
    )(context, state),
    [State.ProxyAccessPossible]: () => notificationAccessPossible(
      ResourceDomainTypes.Proxy,
      {
        title: 'titleProxyAccessPossible',
        message: 'contentProxyAccessPossible',
        button: 'buttonProxyAccessPossible',
      },
    )(context, state),
    [State.ProxyAccessAchieved]: () => notificationAccessAchieved(
      ResourceDomainTypes.Proxy,
      { title: 'titleProxyAccessAchieved', message: 'contentProxyAccessAchieved' },
    )(context, state),
    [State.ShibbolethAccessAchieved]: () => notificationAccessAchieved(
      ResourceDomainTypes.Shibboleth,
      { title: 'titleShibbolethAccessAchieved', message: 'contentShibbolethAccessAchieved' },
    )(context, state),
    [State.OpenAthensAccessAchieved]: () => notificationAccessAchieved(
      ResourceDomainTypes.OpenAthens,
      { title: 'titleOpenAthensAccessAchieved', message: 'contentOpenAthensAccessAchieved' },
    )(context, state),
    [State.Connected]: () => notificationConnected(context, state),
    // Redirects & Search enhancements
    [State.RedirectLoop]: () => notificationRedirected(
      RedirectType.RedirectLoop,
      { title: 'titleRedirectLoop', message: 'contentRedirectLoop' },
    )(context, state, feature),
    [State.CustomRedirected]: () => notificationRedirected(
      RedirectType.Custom,
      { title: 'titleCustomRedirected', message: 'contentCustomRedirected' },
    )(context, state, feature),
    [State.AutoRedirected]: () => notificationRedirected(
      RedirectType.Auto,
      { title: 'titleAutoRedirected', message: 'contentAutoRedirected' },
    )(context, state, feature),
    [State.GoogleScholarSearchEnhanced]: () => notificationRedirected(
      RedirectType.SearchEnhancedGoogleScholar,
      {
        title: 'titleGoogleScholarSearchEnhanced',
        message: 'contentGoogleScholarSearchEnhanced',
      },
    )(context, state, feature),
    [State.PubMedSearchEnhanced]: () => notificationRedirected(
      RedirectType.SearchEnhancedPubMed,
      {
        title: 'titlePubMedSearchEnhanced',
        message: 'contentPubMedSearchEnhanced',
      },
    )(context, state, feature),
    [State.Modal]: () => notificationModal()(context, state, feature),
    [State.Campaign]: () => notificationCampaign()(context, state, feature),
    // other
    [State.OnCampusNotSupported]: () => notificationOnCampusNotSupported()(context, state, feature),
  };

  return notifications[state] || (() => []);
};
