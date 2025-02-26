import HTTPClient from '@/modules/shared/http/HTTPClient';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import HighlightAndAnnotateState from '@/enums/stateMachine/HighlightAndAnnotateState';
import HighlightAndAnnotateResponse from '@/interfaces/highlightAndAnnotate/HighlightAndAnnotateResponse';
import sendHighlightedText from '@/modules/highlightAndAnnotate/sendHighlightedText';
import HighlightAndAnnotatePageData from '@/interfaces/highlightAndAnnotate/HighlightAndAnnotatePageData';
import NonAcademicResource from '@/interfaces/sciwheel/NonAcademicResource';

/**
 * Handler for saving highlighted text (Highlight and Annotate).
 *
 * This runs in the background due to CORS restrictions.
 */
export default (
  pageData: HighlightAndAnnotatePageData,
  digitalResource: DigitalResource,
  nonAcademicResource: NonAcademicResource,
): Promise<HighlightAndAnnotateResponse> => {
  return new Promise(resolve => {
    sendHighlightedText(pageData, digitalResource, nonAcademicResource, HTTPClient)
      .then(resolve)
      .catch(() => resolve({ status: HighlightAndAnnotateState.Error }));
  });
};
