import FuturesStatType from '@/enums/FuturesStatType';

export interface StatLibrarySearchShown {
  type: FuturesStatType.LibrarySearchShown,
  module_uuid: string,
  institute_id: string,
}

export interface StatLibrarySearchClicked {
  type: FuturesStatType.LibrarySearchClicked,
  module_uuid: string,
  institute_id: string,
}

export interface StatOnboardingShown {
  type: FuturesStatType.OnboardingShown,
  module_uuid: string,
  trigger_url: string,
  institute_id: string,
}

export interface StatOnboardingMarkAsRead {
  type: FuturesStatType.OnboardingMarkAsRead,
  module_uuid: string,
  trigger_url: string,
  institute_id: string,
}

export interface StatOnboardingMarkAsUnread {
  type: FuturesStatType.OnboardingMarkAsUnread,
  module_uuid: string,
  institute_id: string,
}

export interface StatFaqShown {
  type: FuturesStatType.FaqShown,
  module_uuid: string,
  trigger_url: string,
  institute_id: string,
}

export interface StatFaqClicked {
  type: FuturesStatType.FaqClicked,
  module_uuid: string,
  trigger_url: string,
  institute_id: string,
}

export interface StatSurveyShown {
  type: FuturesStatType.SurveyShown,
  module_uuid: string,
  trigger_url: string,
  institute_id: string,
}

export interface StatSurveyMarkAsRead {
  type: FuturesStatType.SurveyMarkAsRead,
  module_uuid: string,
  trigger_url: string,
  institute_id: string,
}

export interface StatSurveyMarkAsUnread {
  type: FuturesStatType.SurveyMarkAsUnread,
  module_uuid: string,
  institute_id: string,
}

export interface StatKeywordEnhancementHovered {
  type: FuturesStatType.KeywordEnhancementHovered,
  module_uuid: string,
  trigger_url: string,
  institute_id: string,
}

export interface StatKeywordEnhancementClicked {
  type: FuturesStatType.KeywordEnhancementClicked,
  module_uuid: string,
  trigger_url: string,
  institute_id: string,
}

export interface StatCampaignShown {
  type: FuturesStatType.CampaignShown,
  module_uuid: string,
  trigger_url: string,
  institute_id: string,
}

export interface StatLibChatClicked {
  type: FuturesStatType.LibChatClicked,
  module_uuid: string,
  trigger_url: string,
  institute_id: string,
}

export interface StatCourseCompleted {
  type: FuturesStatType.CourseCompleted,
  institute_id: string,
  module_uuid: string,
  course_id: string,
  limit: number,
}

export interface PrintHoldingsClick {
  type: FuturesStatType.PrintHoldingsClick,
  institute_id: string,
  reference_uuid: string,
}

export interface InstitutionInstalled {
  type: FuturesStatType.InstitutionInstalled,
  institute_id: string,
  uuid: string,
  userAgent: string,
}

export interface CitationsClick {
  type: FuturesStatType.CitationsClick,
  institute_id: string,
  domain: string,
}

export interface CitationsCopy {
  type: FuturesStatType.CitationsCopy,
  institute_id: string,
}

type StatFutures =
  | StatLibrarySearchShown
  | StatLibrarySearchClicked
  | StatOnboardingShown
  | StatOnboardingMarkAsRead
  | StatOnboardingMarkAsUnread
  | StatFaqShown
  | StatFaqClicked
  | StatSurveyShown
  | StatSurveyMarkAsRead
  | StatSurveyMarkAsUnread
  | StatKeywordEnhancementHovered
  | StatKeywordEnhancementClicked
  | StatCampaignShown
  | StatLibChatClicked
  | StatCourseCompleted
  // non-futures stats
  | PrintHoldingsClick
  | InstitutionInstalled
  | CitationsClick
  | CitationsCopy;

export default StatFutures;
