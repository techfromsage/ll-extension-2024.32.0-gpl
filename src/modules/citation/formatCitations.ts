import bootstrap from '@bootstrap/index';
import CitationState from '@/enums/stateMachine/CitationState';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import CitationResponse, { CitationResponseItem } from '@/interfaces/citation/CitationResponse';
import FetchClient from '@/interfaces/http/FetchClient';
import formatQueryParams from './formatQueryParams';

const formatCitations = (
  styleId: number,
  digitalResource: DigitalResource,
  httpClient: FetchClient,
): Promise<CitationResponse> => {
  const queryParams = formatQueryParams(styleId, digitalResource);

  if (digitalResource.institution?.id && queryParams) {
    return httpClient
      .get<{ citations: CitationResponseItem[] }>(
      `${bootstrap.api.citation.format.replace(/{instituteId}/g, digitalResource.institution.id)}?${queryParams}`,
    )
      .then<CitationResponse>(response => {
      const status = response.citations[0].missingVariables?.length
        ? CitationState.MissingVariables
        : CitationState.Success;
      return { ...response, status, styleId };
    })
      .catch(() => ({ status: CitationState.Failed }));
  }
  return Promise.resolve({ status: CitationState.Failed });
};

export default formatCitations;
