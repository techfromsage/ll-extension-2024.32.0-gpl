import RedirectType from '@/enums/RedirectType';
import ResourceDomainTypes from '@/enums/ResourceDomainTypes';
import State from '@/enums/State';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import IsAccessAchieved from './IsAccessAchieved';
import IsAccessPossible from './IsAccessPossible';
import IsAssist from './IsAssist';
import IsConnected from './IsConnected';
import IsEbookFinder from './IsEbookFinder';
import IsEbookFinderMultiple from './IsEbookFinderMultiple';
import IsFullTextFinder from './IsFullTextFinder';
import IsOnCampusNotSupported from './IsOnCampusNotSupported';
import IsOpenAccess from './IsOpenAccess';
import IsOpenAccessEbook from './IsOpenAccessEbook';
import IsPrintBookAvailable from './IsPrintBookAvailable';
import IsOrderForm from './IsOrderForm';
import IsOnCampusSupported from './IsOnCampusSupported';
import IsPriorityAssist from './IsPriorityAssist';
import IsRedirected from './IsRedirected';
import IsTocAlert from './IsTocAlert';
import IsSciteOnGS from './IsSciteOnGS';
import IsSciteOnPublisherWebsite from './IsSciteOnPublisherWebsite';
import IsAlternativesAchieved from './IsAlternativesAchieved';
import IsModal from './IsModal';
import IsLibrarySearch from './IsLibrarySearch';
import IsLibraryServices from './IsLibraryServices';
import IsCampaign from './IsCampaign';
import IsKeywordEnhancements from './IsKeywordEnhancements';
import IsSystemMessage from './IsSystemMessage';

export default {
  // Assist
  IsPriorityAssist,
  IsAssist,
  // SystemMessage
  IsSystemMessage,
  // Alternatives
  IsFullTextFinder,
  IsOpenAccess,
  IsOpenAccessEbook,
  IsEbookFinder,
  IsEbookFinderMultiple,
  IsPrintBookAvailable,
  IsOrderForm,
  IsOnCampusSupported,
  IsFullTextFinderAchieved: (context: FeaturesContext) =>
    IsAlternativesAchieved(State.FullTextFinder, State.FullTextFinderAchieved)(context),
  IsOpenAccessAchieved: (context: FeaturesContext) =>
    IsAlternativesAchieved(State.OpenAccess, State.OpenAccessAchieved)(context),
  IsOpenAccessEbookAchieved: (context: FeaturesContext) =>
    IsAlternativesAchieved(State.OpenAccessEbook, State.OpenAccessAchieved)(context),
  IsEbookFinderAchieved: (context: FeaturesContext) =>
    IsAlternativesAchieved(State.EbookFinder, State.EbookFinderAchieved)(context),
  IsOrderFormAchieved: (context: FeaturesContext) =>
    IsAlternativesAchieved(State.OrderForm, State.OrderForm)(context),
  // Access
  IsProxyAccessPossible: IsAccessPossible(ResourceDomainTypes.Proxy, State.ProxyAccessPossible),
  /**
   * Dev note: "isProxyUrl" for SSO states.
   * We don't want to provide access to SSO logins if already on Proxy. The changes in URLs could cause side effects.
   * */
  IsOpenAthensAccessPossible: IsAccessPossible(ResourceDomainTypes.OpenAthens, State.OpenAthensAccessPossible),
  IsShibbolethAccessPossible: IsAccessPossible(ResourceDomainTypes.Shibboleth, State.ShibbolethAccessPossible),
  IsProxyAccessAchieved: IsAccessAchieved(ResourceDomainTypes.Proxy, State.ProxyAccessAchieved),
  IsShibbolethAccessAchieved: IsAccessAchieved(ResourceDomainTypes.Shibboleth, State.ShibbolethAccessAchieved),
  IsOpenAthensAccessAchieved: IsAccessAchieved(ResourceDomainTypes.OpenAthens, State.OpenAccessAchieved),
  // Redirects & Search enhancements
  IsRedirectLoop: IsRedirected([RedirectType.RedirectLoop]),
  IsCustomRedirected: IsRedirected([RedirectType.Custom]),
  IsAutoRedirected: IsRedirected([RedirectType.Auto]),
  IsGoogleScholarSearchEnhanced: IsRedirected([RedirectType.SearchEnhancedGoogleScholar]),
  IsPubMedSearchEnhanced: IsRedirected([RedirectType.SearchEnhancedPubMed]),
  IsSearchEnhanced: IsRedirected([RedirectType.SearchEnhancedGoogleScholar, RedirectType.SearchEnhancedPubMed]),
  // Other
  IsTocAlert,
  IsSciteOnGS,
  IsSciteOnPublisherWebsite,
  IsLibrarySearch,
  IsModal,
  IsLibraryServices,
  IsCampaign,
  IsKeywordEnhancements,
  // End states
  IsOnCampusNotSupported,
  IsConnected,
};
