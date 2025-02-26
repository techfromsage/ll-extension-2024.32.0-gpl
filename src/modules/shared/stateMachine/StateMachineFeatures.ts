/**
 * StateMachineFeatures is used to determine all the available "Features" for a given URL and the
 * users institutions settings.
 *
 * When the page loads, the State Machine "runs" and finds the first relevant state for Access, Alternatives and Assist etc...
 * We then use this to show content to the user (such as notifications) in the popup and side tray
 *
 * This state machine is triggered when a 'determineAvailableFeatures' request is made to the background.
 * The background then triggers this in
 * `app-extension/src/background/listeners/triggerStateMachineFeatures.ts`
 *
 */

import { createMachine, MachineConfig } from 'xstate';
import State from '@/enums/State';
import StateSort, { WithState } from '@/modules/shared/StateSort';
import Feature from '@/enums/Feature';
import FeaturesTypeState from '@/interfaces/stateMachine/FeaturesTypeState';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import guards from './guards';
import actions from './actions';

/**
 * Sort and filter the 'always' array by state to ensure the right states get triggered first.
 *
 * @param {WithState[]} items
 * @param {State[]} notificationsOrder
 * @returns {WithState[]}
 */
const sortByState = (items: WithState[], notificationsOrder: State[]): WithState[] => {
  return items.filter(({ target }) => target && notificationsOrder.includes(target))
    .sort(StateSort(notificationsOrder, 'target'));
};

/**
 * @param {State[]} notificationsOrder
 * @constructor
 */
export default (
  notificationsOrder: State[],
) => {
  const config: MachineConfig<any, any, any> = {
    id: 'StateMachineFeatures',
    predictableActionArguments: true,
    type: 'parallel',
    initial: State.Idle,
    schema: {
      context: {} as FeaturesContext,
    },
    states: {
      // State for Assist feature
      [Feature.Assist]: {
        initial: State.Idle,
        states: {
          [State.Idle]: {
            always: sortByState([
              { target: State.PriorityAssist, cond: 'IsPriorityAssist' },
              { target: State.Assist, cond: 'IsAssist' },
              { target: State.NotSupported },
            ] as WithState[], notificationsOrder),
          },
          [State.PriorityAssist]: {},
          [State.Assist]: {},
          [State.NotSupported]: { type: 'final' },
        },
      },
      // State for SystemMessage feature
      [Feature.SystemMessage]: {
        initial: State.Idle,
        states: {
          [State.Idle]: {
            always: sortByState([
              { target: State.SystemMessage, cond: 'IsSystemMessage' },
              { target: State.NotSupported },
            ] as WithState[], notificationsOrder),
          },
          [State.SystemMessage]: {},
          [State.NotSupported]: { type: 'final' },
        },
      },
      // State for Access feature
      [Feature.Access]: {
        initial: State.Idle,
        states: {
          [State.Idle]: {
            always: sortByState([
              {
                target: State.OpenAthensAccessPossible,
                cond: 'IsOpenAthensAccessPossible',
              },
              {
                target: State.ShibbolethAccessPossible,
                cond: 'IsShibbolethAccessPossible',
              },
              {
                target: State.ProxyAccessPossible,
                cond: 'IsProxyAccessPossible',
              },
              { target: State.ProxyAccessAchieved, cond: 'IsProxyAccessAchieved' },
              { target: State.ShibbolethAccessAchieved, cond: 'IsShibbolethAccessAchieved' },
              { target: State.OpenAthensAccessAchieved, cond: 'IsOpenAthensAccessAchieved' },
              { target: State.Connected, cond: 'IsConnected' },
              { target: State.OnCampusSupported, cond: 'IsOnCampusSupported' },
              { target: State.OnCampusNotSupported, cond: 'IsOnCampusNotSupported' },
              { target: State.NotSupported },
            ] as WithState[], notificationsOrder),
          },
          [State.OpenAthensAccessPossible]: {},
          [State.ShibbolethAccessPossible]: {},
          [State.ProxyAccessPossible]: {},
          [State.ProxyAccessAchieved]: {},
          [State.ShibbolethAccessAchieved]: {},
          [State.OpenAthensAccessAchieved]: {},
          [State.Connected]: {},
          [State.OnCampusSupported]: {},
          [State.OnCampusNotSupported]: { type: 'final' },
          [State.NotSupported]: { type: 'final' },
        },
      },
      // State for Alternatives feature
      [Feature.Alternatives]: {
        initial: State.Idle,
        states: {
          [State.Idle]: {
            always: sortByState([
              { target: State.FullTextFinder, cond: 'IsFullTextFinder' },
              { target: State.OpenAccess, cond: 'IsOpenAccess' },
              { target: State.OpenAccessEbook, cond: 'IsOpenAccessEbook' },
              { target: State.EbookFinder, cond: 'IsEbookFinder' },
              { target: State.EbookFinderMultiple, cond: 'IsEbookFinderMultiple' },
              { target: State.OrderForm, cond: 'IsOrderForm' },
              { target: State.FullTextFinderAchieved, cond: 'IsFullTextFinderAchieved' },
              { target: State.OpenAccessAchieved, cond: 'IsOpenAccessAchieved' },
              { target: State.EbookFinderAchieved, cond: 'IsEbookFinderAchieved' },
              { target: State.NotSupported },
            ] as WithState[], notificationsOrder),
          },
          [State.FullTextFinder]: {
            always: [
              { target: State.FullTextFinderAchieved, cond: 'IsFullTextFinderAchieved' },
            ],
          },
          [State.OpenAccess]: {
            always: [
              { target: State.OpenAccessAchieved, cond: 'IsOpenAccessAchieved' },
            ],
          },
          [State.OpenAccessEbook]: {
            always: [
              { target: State.OpenAccessAchieved, cond: 'IsOpenAccessEbookAchieved' },
            ],
          },
          [State.EbookFinder]: {
            always: [
              { target: State.EbookFinderAchieved, cond: 'IsEbookFinderAchieved' },
            ],
          },
          [State.EbookFinderMultiple]: {},
          [State.OrderForm]: {
            always: [
              { target: State.NotSupported, cond: 'IsOrderFormAchieved' },
            ],
          },
          [State.FullTextFinderAchieved]: {},
          [State.EbookFinderAchieved]: {},
          [State.OpenAccessAchieved]: {},
          [State.NotSupported]: { type: 'final' },
        },
      },
      [Feature.AlternativesPhysical]: {
        initial: State.Idle,
        states: {
          [State.Idle]: {
            always: sortByState([
              { target: State.PrintBookAvailable, cond: 'IsPrintBookAvailable' },
              { target: State.NotSupported },
            ] as WithState[], notificationsOrder),
          },
          [State.PrintBookAvailable]: {},
          [State.NotSupported]: { type: 'final' },
        },
      },
      // State for Search enhancers feature
      [Feature.SearchEnhancer]: {
        initial: State.Idle,
        states: {
          [State.Idle]: {
            always: sortByState([
              { target: State.SearchEnhanced, cond: 'IsSearchEnhanced' },
              {
                target: State.GoogleScholarSearchEnhanced,
                cond: 'IsGoogleScholarSearchEnhanced',
                actions: ['UnflagRedirect'],
              },
              { target: State.PubMedSearchEnhanced, cond: 'IsPubMedSearchEnhanced', actions: ['UnflagRedirect'] },
              { target: State.NotSupported },
            ] as WithState[], notificationsOrder),
          },
          [State.SearchEnhanced]: {},
          [State.GoogleScholarSearchEnhanced]: {},
          [State.PubMedSearchEnhanced]: {},
          [State.NotSupported]: { type: 'final' },
        },
      },
      [Feature.Redirected]: {
        initial: State.Idle,
        states: {
          [State.Idle]: {
            always: sortByState([
              { target: State.RedirectLoop, cond: 'IsRedirectLoop', actions: ['UnflagRedirect'] },
              { target: State.CustomRedirected, cond: 'IsCustomRedirected', actions: ['UnflagRedirect'] },
              { target: State.AutoRedirected, cond: 'IsAutoRedirected', actions: ['UnflagRedirect'] },
              { target: State.NotSupported },
            ] as WithState[], notificationsOrder),
          },
          [State.RedirectLoop]: {},
          [State.CustomRedirected]: {},
          [State.AutoRedirected]: {},
          [State.NotSupported]: { type: 'final' },
        },
      },
      [Feature.TocAlerts]: {
        initial: State.Idle,
        states: {
          [State.Idle]: {
            always: [
              { target: State.Supported, cond: 'IsTocAlert' },
              { target: State.NotSupported },
            ],
          },
          [State.Supported]: { type: 'final' },
          [State.NotSupported]: { type: 'final' },
        },
      },
      [Feature.Scite]: {
        initial: State.Idle,
        states: {
          [State.Idle]: {
            always: [
              { target: State.SciteOnGoogleScholarSupported, cond: 'IsSciteOnGS' },
              { target: State.SciteOnPublisherWebsiteSupported, cond: 'IsSciteOnPublisherWebsite' },
              { target: State.NotSupported },
            ],
          },
          [State.SciteOnGoogleScholarSupported]: { type: 'final' },
          [State.SciteOnPublisherWebsiteSupported]: { type: 'final' },
          [State.NotSupported]: { type: 'final' },
        },
      },
      [Feature.Modal]: {
        initial: State.NotSupported,
        states: {
          [State.NotSupported]: {
            always: [
              { target: State.Modal, cond: 'IsModal' },
            ],
          },
          [State.Modal]: { type: 'final' },
        },
      },
      [Feature.LibrarySearch]: {
        initial: State.Idle,
        states: {
          [State.Idle]: {
            always: [
              { target: State.Supported, cond: 'IsLibrarySearch' },
              { target: State.NotSupported },
            ],
          },
          [State.Supported]: { type: 'final' },
          [State.NotSupported]: { type: 'final' },
        },
      },
      [Feature.LibraryServices]: {
        initial: State.NotSupported,
        states: {
          [State.NotSupported]: {
            always: [
              { target: State.Supported, cond: 'IsLibraryServices' },
            ],
          },
          [State.Supported]: { type: 'final' },
        },
      },
      [Feature.Campaign]: {
        initial: State.NotSupported,
        states: {
          [State.NotSupported]: {
            always: [
              { target: State.Campaign, cond: 'IsCampaign' },
            ],
          },
          [State.Campaign]: { type: 'final' },
        },
      },
      [Feature.KeywordEnhancements]: {
        initial: State.NotSupported,
        states: {
          [State.NotSupported]: {
            always: [
              { target: State.Supported, cond: 'IsKeywordEnhancements' },
            ],
          },
          [State.Supported]: { type: 'final' },
        },
      },
    },
  };
  return createMachine<FeaturesContext, any, FeaturesTypeState>(config, { guards, actions });
};
