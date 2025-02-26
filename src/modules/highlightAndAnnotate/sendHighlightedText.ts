import bootstrap from '@bootstrap/index';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import FetchClient from '@/interfaces/http/FetchClient';
import HighlightAndAnnotateState from '@/enums/stateMachine/HighlightAndAnnotateState';
import HighlightAndAnnotateResponse from '@/interfaces/highlightAndAnnotate/HighlightAndAnnotateResponse';
import { store } from '@/store';
import HighlightAndAnnotatePageData from '@/interfaces/highlightAndAnnotate/HighlightAndAnnotatePageData';
import NonAcademicResource from '@/interfaces/sciwheel/NonAcademicResource';
import AdaptorMetadataToLibraryItem from '../referenceManager/AdaptorMetadataToLibraryItem';

const sendHighlightedText = (
  pageData: HighlightAndAnnotatePageData,
  digitalResource: DigitalResource,
  nonAcademicResource: NonAcademicResource,
  httpClient: FetchClient,
): Promise<HighlightAndAnnotateResponse> => {
  const { user } = store.getState();

  // If the user is not logged in, return an error
  if (!user?.apiToken) {
    return Promise.resolve({ status: HighlightAndAnnotateState.Error });
  }

  // If there are no resources to save, return an error, as this is a required field and would cause a 500 error
  if (Object.keys(digitalResource).length === 0 && Object.keys(nonAcademicResource).length === 0) {
    return Promise.resolve({ status: HighlightAndAnnotateState.Error });
  }

  // Destructure the pageData object
  const {
    color, selection: {
      quoteContext, ranges, quote, images,
    }, page: { uri },
  } = pageData;

  // Determine which resource to convert to a sciwheel resource
  const resource = Object.keys(digitalResource).length ? digitalResource : nonAcademicResource;
  const sciwheelResource = AdaptorMetadataToLibraryItem(resource as DigitalResource & NonAcademicResource, uri);

  // If the sciwheelResource is not valid, return an error, as this is a required field and would cause a 500 error
  if (!sciwheelResource) {
    return Promise.resolve({ status: HighlightAndAnnotateState.Error });
  }

  const headers = { Authorization: `${user.apiToken.type} ${user.apiToken.value}` };
  const body = JSON.stringify({
    color,
    idInfo: sciwheelResource, // this is the metadata of the resource
    images,
    quote,
    quoteContext,
    text: '', // this is the optional note, empty because we separated that request
    uri,
    libraryItemId: null,
    ranges,
  });

  return httpClient
    .post(bootstrap.api.sciwheel.annotations, {
      headers,
      body,
    })
    .then<HighlightAndAnnotateResponse>(response => {
    return {
      status: HighlightAndAnnotateState.Success,
      newHighlight: response,
    };
  })
    .catch(() => ({ status: HighlightAndAnnotateState.Error }));
};

export default sendHighlightedText;
