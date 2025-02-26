/**
 * Event types for non-redux insyde stats, named 'workflow' now 'futures'.
 * New stats from other modules will also be added here.
 */

enum FuturesStatType {
  LibrarySearchShown = 'LibrarySearchShown',
  OnboardingShown = 'OnboardingShown',
  CampaignShown = 'CampaignShown',
  SurveyShown = 'SurveyShown',
  FaqShown = 'FaqShown',
  LibrarySearchClicked = 'LibrarySearchClicked',
  FaqClicked = 'FaqClicked',
  OnboardingMarkAsRead = 'OnboardingMarkAsRead',
  OnboardingMarkAsUnread = 'OnboardingMarkAsUnRead',
  SurveyMarkAsRead = 'SurveyMarkAsRead',
  SurveyMarkAsUnread = 'SurveyMarkAsUnread',
  KeywordEnhancementHovered = 'KeywordEnhancementHovered',
  KeywordEnhancementClicked = 'KeywordEnhancementClicked',
  LibChatClicked = 'LibChatClicked',
  CourseCompleted = 'courseCompleted',
  // non-futures stats
  PrintHoldingsClick = 'printHoldingsClick',
  InstitutionInstalled = 'institutionInstalled',
  CitationsClick = 'citationsClick',
  CitationsCopy = 'citationsCopy',
}

export default FuturesStatType;
