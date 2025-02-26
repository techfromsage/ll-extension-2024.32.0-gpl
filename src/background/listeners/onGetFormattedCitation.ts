import HTTPClient from '@/modules/shared/http/HTTPClient';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import CitationState from '@/enums/stateMachine/CitationState';
import CitationResponse from '@/interfaces/citation/CitationResponse';
import formatCitations from '@/modules/citation/formatCitations';

/**
 * Handler for fetching a formatted citation based on style id and metadata.
 *
 * This runs in the background due to CORS restrictions.
 */
export default (
  styleId: number,
  digitalResource: DigitalResource,
): Promise<CitationResponse> => {
  return new Promise(resolve => {
    formatCitations(styleId, digitalResource, HTTPClient)
      .then(resolve)
      .catch(() => resolve({ status: CitationState.Failed }));
  });
};
