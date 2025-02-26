enum SciteNoticesEnum {
  RETRACTED = 'retracted',
  EXPRESSION_OF_CONCERN = 'has expression of concern',
  WITHDRAWN = 'withdrawn',
  ERRATUM = 'has erratum',
  CORRECTION = 'has correction',
}

type SciteNotices = string[];

type SciteNoticesResponse = {
  notices: Record<string, SciteNotices>,
};

export {
  SciteNoticesEnum,
  SciteNotices,
  SciteNoticesResponse,
};
