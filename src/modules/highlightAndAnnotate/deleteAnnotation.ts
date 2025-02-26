import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import FetchClient from '@/interfaces/http/FetchClient';
import { store } from '@/store';
import bootstrap from '@bootstrap/index';
import HighlightAndAnnotateResponse from '@/interfaces/highlightAndAnnotate/HighlightAndAnnotateResponse';
import HighlightAndAnnotateState from '@/enums/stateMachine/HighlightAndAnnotateState';
import HighlightAndAnnotatePageData from '@/interfaces/highlightAndAnnotate/HighlightAndAnnotatePageData';

const deleteAnnotation = (
  pageData: HighlightAndAnnotatePageData,
  digitalResource: DigitalResource,
  httpClient: FetchClient,
): Promise<HighlightAndAnnotateResponse> => {
  const { user } = store.getState();

  if (digitalResource && user?.apiToken) {
    const headers = { Authorization: `${user.apiToken.type} ${user.apiToken.value}` };
    const url = `${bootstrap.api.sciwheel.annotations}/${pageData.id}`;

    return httpClient
      .delete(url, {
        headers,
      })
      .then<HighlightAndAnnotateResponse>(() => {
      return {
        annotationId: pageData.id,
        status: HighlightAndAnnotateState.Success,
      };
    })
      .catch(() => ({ status: HighlightAndAnnotateState.Error }));
  }
  return Promise.resolve({ status: HighlightAndAnnotateState.Error });
};

export default deleteAnnotation;
