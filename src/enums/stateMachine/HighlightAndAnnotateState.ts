/**
 * Represents the different states the highlight and annotate feature can be in.
 */
enum HighlightAndAnnotateState {
  // main states
  Init = 'init',
  NoUserSelected = 'noUserSelected', // User is not logged in
  On = 'on', // User has turned on the feature, ready to highlight text
  Off = 'off', // User has turned off the feature

  // transition states
  SavingHighlightedText = 'SavingHighlightedText', // Highlighting text
  FetchingHighlights = 'fetchingHighlights', // Fetching existing highlights
  UpdatingAnnotation = 'UpdatingAnnotation', // Updating annotation
  DeletingAnnotation = 'DeletingAnnotation', // Deleting annotation

  // alert message states
  TurningOff = 'turningOff', // Turning off the feature
  TurningOn = 'turningOn', // Turning on the feature
  Success = 'Success', // Saving highlight or annotation success
  Error = 'Error', // Saving highlight or annotation error
}

export default HighlightAndAnnotateState;
