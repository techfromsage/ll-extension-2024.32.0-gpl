import HighlightAndAnnotateResponse from '@/interfaces/highlightAndAnnotate/HighlightAndAnnotateResponse';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import HighlightAndAnnotateState from '@/enums/stateMachine/HighlightAndAnnotateState';
import deleteAnnotation from '@/modules/highlightAndAnnotate/deleteAnnotation';
import HTTPClient from '@/modules/shared/http/HTTPClient';
import HighlightAndAnnotatePageData from '@/interfaces/highlightAndAnnotate/HighlightAndAnnotatePageData';

export default (
  pageData: HighlightAndAnnotatePageData,
  digitalResource: DigitalResource,
): Promise<HighlightAndAnnotateResponse> => {
  return new Promise(resolve => {
    deleteAnnotation(pageData, digitalResource, HTTPClient)
      .then(resolve)
      .catch(() => resolve({ status: HighlightAndAnnotateState.Error }));
  });
};
