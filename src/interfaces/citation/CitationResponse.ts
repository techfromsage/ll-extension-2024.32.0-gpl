import CitationState from '@/enums/stateMachine/CitationState';

export type CitationResponseItem = {
  identifier: string,
  citation: string,
  missingVariables?: string[],
};

type CitationResponse =
  | { status: CitationState.Success, citations: CitationResponseItem[], styleId: number }
  | { status: CitationState.MissingVariables, citations: CitationResponseItem[], styleId: number }
  | { status: CitationState.Failed }
  | { status: CitationState.Fetching };

export default CitationResponse;
