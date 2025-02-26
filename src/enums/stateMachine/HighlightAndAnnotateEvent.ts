/**
 * HighlightAndAnnotate is used to represent and standardise the events that can be triggered
 */
enum HighlightAndAnnotateEvent {
  Init = 'xstate.init',
  TurnOff = 'off',
  FetchHighlights = 'fetchHighlights',
  TurnOn = 'on',
  Highlight = 'highlight',
  UpdateSelection = 'updateSelection',
  SaveHighlightedText = 'saveHighlightedText',
  UpdateAnnotation = 'updateAnnotation',
  DeleteAnnotation = 'deleteAnnotation',
  DetermineResources = 'determineResources',
}

export default HighlightAndAnnotateEvent;
