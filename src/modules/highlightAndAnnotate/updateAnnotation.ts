import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import FetchClient from '@/interfaces/http/FetchClient';
import HighlightAndAnnotateResponse from '@/interfaces/highlightAndAnnotate/HighlightAndAnnotateResponse';
import HighlightAndAnnotateState from '@/enums/stateMachine/HighlightAndAnnotateState';
import bootstrap from '@bootstrap/index';
import { store } from '@/store';
import HighlightAndAnnotatePageData from '@/interfaces/highlightAndAnnotate/HighlightAndAnnotatePageData';

const updateAnnotation = (
  pageData: HighlightAndAnnotatePageData,
  digitalResource: DigitalResource,
  httpClient: FetchClient,
): Promise<HighlightAndAnnotateResponse> => {
  const { user } = store.getState();

  if (digitalResource && user?.apiToken) {
    const headers = { Authorization: `${user.apiToken.type} ${user.apiToken.value}` };
    const url = `${bootstrap.api.sciwheel.annotations}/${pageData.id}`;
    const body = JSON.stringify(pageData);

    return httpClient
      .put(url, {
        headers,
        body,
      })
      .then<HighlightAndAnnotateResponse>(response => {
      return {
        status: HighlightAndAnnotateState.Success,
        highlight: response,
      };
    })
      .catch(() => ({ status: HighlightAndAnnotateState.Error }));
  }
  return Promise.resolve({ status: HighlightAndAnnotateState.Error });
};

export default updateAnnotation;
