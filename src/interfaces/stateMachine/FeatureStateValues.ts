/**
 * Interface FeatureStateValues represents the available output states for the Feature StateMachine.
 */
import Feature from '@/enums/Feature';
import State from '@/enums/State';

interface FeatureStateValues {
  [Feature.Access]: State,
  [Feature.Alternatives]: State,
  [Feature.Assist]: State,
  [Feature.SystemMessage]: State,
  [Feature.SearchEnhancer]: State,
  [Feature.Redirected]: State,
  [Feature.TocAlerts]: State,
  [Feature.Scite]: State,
  [Feature.Modal]: State,
  [Feature.LibrarySearch]: State,
  [Feature.LibraryServices]: State,
  [Feature.Campaign]: State,
  [Feature.KeywordEnhancements]: State,
}

export default FeatureStateValues;
