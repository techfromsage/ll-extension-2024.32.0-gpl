/**
 * Handles highlighting keywords on the page.
 */
import { FeaturesDetermined } from '@/interfaces/browser/AppMethods';
import StateMachineKeywordEnhancements, {
  StateInterpreterKeywordEnhancements,
} from '@/modules/shared/stateMachine/StateMachineKeywordEnhancements';
import { interpret } from 'xstate';
import AppSettings from '@/interfaces/AppSettings';
import highlightKeywords from '@/content-script/keywordEnhancements/highlightKeywords';
import KeywordEnhancementsEvent from '@/enums/stateMachine/KeywordEnhancementsEvent';
import State from '@/enums/State';
import Feature from '@/enums/Feature';
import KeywordPackage from '@/interfaces/keywordEnhancements/KeywordPackage';
import createShadowKeywordEnhancementsContainer, {
  destroyShadowKeywordEnhancementsContainer,
} from '@/components/Shadow/createShadowKeywordEnhancementsContainer';

/**
 * Sorts an array of keywords packages by putting the "enabled" ones at the top.
 *
 * @param {StateInterpreterKeywordEnhancements} interpreter1
 * @param {StateInterpreterKeywordEnhancements} interpreter2
 * @returns {number | number}
 */
const sortByEnabled = (
  interpreter1: StateInterpreterKeywordEnhancements,
  interpreter2: StateInterpreterKeywordEnhancements,
) => {
  const firstEnabled = interpreter1.getSnapshot().context.enabled;
  const secondEnabled = interpreter2.getSnapshot().context.enabled;
  if (firstEnabled === secondEnabled) {
    return 0;
  }
  return firstEnabled ? -1 : 1;
};
/**
 * @param availablePackages
 * @param keywordEnhancements
 */
export default (
  availablePackages: KeywordPackage[],
  { keywordEnhancements }: AppSettings,
) => async (features: FeaturesDetermined): Promise<FeaturesDetermined> => {
  const { featureValues } = features;
  if (featureValues[Feature.KeywordEnhancements] === State.NotSupported) {
    destroyShadowKeywordEnhancementsContainer();
    return features;
  }

  createShadowKeywordEnhancementsContainer();

  if (!window.stateInterpreterKeywordEnhancements) {
    window.stateInterpreterKeywordEnhancements = availablePackages
      .map(keywordPackage => {
        const packageEnabled = keywordEnhancements.enabled && keywordEnhancements.packages[keywordPackage.uuid];
        const stateMachine = StateMachineKeywordEnhancements(keywordPackage, packageEnabled);
        return interpret(stateMachine).start() as unknown as StateInterpreterKeywordEnhancements;
      })
      .sort(sortByEnabled);
    window.stateInterpreterKeywordEnhancements.forEach(interpreter => highlightKeywords(interpreter, window.document));
    return features;
  }

  window.stateInterpreterKeywordEnhancements.sort(sortByEnabled);
  window.stateInterpreterKeywordEnhancements.forEach(stateInterpreterKeywordEnhancements => {
    const { context } = stateInterpreterKeywordEnhancements.getSnapshot();
    const event = keywordEnhancements.packages[context.keywordPackage.uuid]
      ? KeywordEnhancementsEvent.TurnOn
      : KeywordEnhancementsEvent.TurnOff;
    stateInterpreterKeywordEnhancements.send(event);
  });

  return features;
};
