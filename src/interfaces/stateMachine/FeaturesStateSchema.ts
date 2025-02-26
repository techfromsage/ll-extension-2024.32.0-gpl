/**
 * FeaturesStateSchema maps out all the different allowed states the StateMachineFeatures can get into.
 *
 * It's like an overview of the states for the state machine.
 */

import State from '@/enums/State';
import Feature from '@/enums/Feature';

interface FeaturesStateSchema {
  initial: State.Idle,
  states: {
    [Feature.Assist]: {
      initial: State.Idle,
      states: {
        [State.Idle]: Record<string, unknown>,
        [State.PriorityAssist]: Record<string, unknown>,
        [State.Assist]: Record<string, unknown>,
        [State.OnCampusNotSupported]: Record<string, unknown>,
        [State.NotSupported]: Record<string, unknown>,
      },
    },
    [Feature.SystemMessage]: {
      initial: State.Idle,
      states: {
        [State.Idle]: Record<string, unknown>,
        [State.SystemMessage]: Record<string, unknown>,
        [State.NotSupported]: Record<string, unknown>,
      },
    },
    [Feature.Access]: {
      initial: State.Idle,
      states: {
        [State.Idle]: Record<string, unknown>,
        [State.OpenAthensAccessPossible]: Record<string, unknown>,
      },
      [State.ShibbolethAccessPossible]: Record<string, unknown>,
      [State.ProxyAccessPossible]: Record<string, unknown>,
      [State.ProxyAccessAchieved]: Record<string, unknown>,
      [State.ShibbolethAccessAchieved]: Record<string, unknown>,
      [State.OpenAthensAccessAchieved]: Record<string, unknown>,
      [State.Connected]: Record<string, unknown>,
      [State.OnCampusNotSupported]: Record<string, unknown>,
      [State.NotSupported]: Record<string, unknown>,
    },
  },
  [Feature.Alternatives]: {
    initial: State.Idle,
    states: {
      [State.Idle]: Record<string, unknown>,
      [State.FullTextFinder]: Record<string, unknown>,
      [State.OpenAccess]: Record<string, unknown>,
      [State.EbookFinder]: Record<string, unknown>,
      [State.EbookFinderMultiple]: Record<string, unknown>,
      [State.OrderForm]: Record<string, unknown>,
      [State.FullTextFinderAchieved]: Record<string, unknown>,
      [State.EbookFinderAchieved]: Record<string, unknown>,
      [State.OpenAccessAchieved]: Record<string, unknown>,
      [State.OnCampusNotSupported]: Record<string, unknown>,
      [State.NotSupported]: Record<string, unknown>,
    },
  },
  [Feature.SearchEnhancer]: {
    initial: State.Idle,
    states: {
      [State.Idle]: Record<string, unknown>,
      [State.SearchEnhanced]: Record<string, unknown>,
      [State.GoogleScholarSearchEnhanced]: Record<string, unknown>,
      [State.PubMedSearchEnhanced]: Record<string, unknown>,
      [State.OnCampusNotSupported]: Record<string, unknown>,
      [State.NotSupported]: Record<string, unknown>,
    },
  },
  [Feature.Redirected]: {
    initial: State.Idle,
    states: {
      [State.Idle]: Record<string, unknown>,
      [State.AutoRedirected]: Record<string, unknown>,
      [State.CustomRedirected]: Record<string, unknown>,
      [State.RedirectLoop]: Record<string, unknown>,
      [State.OnCampusNotSupported]: Record<string, unknown>,
      [State.NotSupported]: Record<string, unknown>,
    },
  },
  [Feature.TocAlerts]: {
    initial: State.Idle,
    states: {
      [State.Idle]: Record<string, unknown>,
      [State.Supported]: Record<string, unknown>,
      [State.NotSupported]: Record<string, unknown>,
    },
  },
  [Feature.Scite]: {
    initial: State.Idle,
    states: {
      [State.Idle]: Record<string, unknown>,
      [State.Supported]: Record<string, unknown>,
      [State.NotSupported]: Record<string, unknown>,
    },
  },
  [Feature.Modal]: {
    initial: State.NotSupported,
    states: {
      [State.Modal]: Record<string, unknown>,
      [State.NotSupported]: Record<string, unknown>,
    },
  },
  [Feature.LibrarySearch]: {
    initial: State.NotSupported,
    states: {
      [State.Supported]: Record<string, unknown>,
      [State.NotSupported]: Record<string, unknown>,
    },
  },
  [Feature.LibraryServices]: {
    initial: State.NotSupported,
    states: {
      [State.Supported]: Record<string, unknown>,
      [State.NotSupported]: Record<string, unknown>,
    },
  },
  [Feature.Campaign]: {
    initial: State.NotSupported,
    states: {
      [State.Campaign]: Record<string, unknown>,
      [State.NotSupported]: Record<string, unknown>,
    },
  },
  [Feature.KeywordEnhancements]: {
    initial: State.NotSupported,
    states: {
      [State.NotSupported]: Record<string, unknown>,
      [State.Supported]: Record<string, unknown>,
    },
  },
}

export default FeaturesStateSchema;
