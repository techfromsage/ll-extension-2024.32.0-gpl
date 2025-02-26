import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import HighlightAndAnnotateResponse from '@/interfaces/highlightAndAnnotate/HighlightAndAnnotateResponse';
import fetchAnnotations from '@/modules/highlightAndAnnotate/fetchAnnotations';
import HighlightAndAnnotateState from '@/enums/stateMachine/HighlightAndAnnotateState';
import HTTPClient from '@/modules/shared/http/HTTPClient';
import NonAcademicResource from '@/interfaces/sciwheel/NonAcademicResource';

export default (
  uri: string,
  digitalResource: DigitalResource,
  nonAcademicResource: NonAcademicResource,
): Promise<HighlightAndAnnotateResponse> => {
  return new Promise(resolve => {
    fetchAnnotations(uri, digitalResource, nonAcademicResource, HTTPClient)
      .then(resolve)
      .catch(() => resolve({ status: HighlightAndAnnotateState.Error }));
  });
};
