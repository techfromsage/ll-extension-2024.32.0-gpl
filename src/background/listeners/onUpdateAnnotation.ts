import HTTPClient from '@/modules/shared/http/HTTPClient';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import HighlightAndAnnotateState from '@/enums/stateMachine/HighlightAndAnnotateState';
import HighlightAndAnnotateResponse from '@/interfaces/highlightAndAnnotate/HighlightAndAnnotateResponse';
import updateAnnotation from '@/modules/highlightAndAnnotate/updateAnnotation';
import HighlightAndAnnotatePageData from '@/interfaces/highlightAndAnnotate/HighlightAndAnnotatePageData';

/**
 * Handler for updating the annotation (Highlight and Annotate).
 *
 * @param pageData
 * @param digitalResource
 */
export default (
  pageData: HighlightAndAnnotatePageData,
  digitalResource: DigitalResource,
): Promise<HighlightAndAnnotateResponse> => {
  return new Promise(resolve => {
    updateAnnotation(pageData, digitalResource, HTTPClient)
      .then(resolve)
      .catch(() => resolve({ status: HighlightAndAnnotateState.Error }));
  });
};
