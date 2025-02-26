import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import HighlightAndAnnotateResponse from '@/interfaces/highlightAndAnnotate/HighlightAndAnnotateResponse';
import { store } from '@/store';
import HighlightAndAnnotateState from '@/enums/stateMachine/HighlightAndAnnotateState';
import bootstrap from '@bootstrap/index';
import FetchClient from '@/interfaces/http/FetchClient';
import Annotation from '@/interfaces/highlightAndAnnotate/Annotation';
import NonAcademicResource from '@/interfaces/sciwheel/NonAcademicResource';
import AdaptorMetadataToLibraryItem from '@/modules/referenceManager/AdaptorMetadataToLibraryItem';

export interface AnnotationsResponse {
  annotations: Annotation[],
  libraryItemId: string,
}

const fetchAnnotations = (
  uri: string,
  digitalResource: DigitalResource,
  nonAcademicResource: NonAcademicResource,
  httpClient: FetchClient,
): Promise<HighlightAndAnnotateResponse> => {
  const { user } = store.getState();

  if (!user?.apiToken) {
    return Promise.resolve({ status: HighlightAndAnnotateState.Error });
  }

  if (Object.keys(digitalResource).length === 0 && Object.keys(nonAcademicResource).length === 0) {
    return Promise.resolve({ status: HighlightAndAnnotateState.Error });
  }

  const resource = Object.keys(digitalResource).length ? digitalResource : nonAcademicResource;
  const libraryItem = AdaptorMetadataToLibraryItem(resource as DigitalResource & NonAcademicResource, uri);

  if (!libraryItem) {
    return Promise.resolve({ status: HighlightAndAnnotateState.Error });
  }

  const headers = { Authorization: `${user.apiToken.type} ${user.apiToken.value}` };
  const body = JSON.stringify(libraryItem);

  return httpClient
    .post(bootstrap.api.sciwheel.fetchAnnotations, {
      headers,
      body,
    })
    .then<HighlightAndAnnotateResponse>(response => {
    const { annotations, libraryItemId } = response as AnnotationsResponse;
    return {
      status: HighlightAndAnnotateState.Success,
      annotations,
      libraryItemId,
    };
  })
    .catch(() => ({ status: HighlightAndAnnotateState.Error }));
};

export default fetchAnnotations;
