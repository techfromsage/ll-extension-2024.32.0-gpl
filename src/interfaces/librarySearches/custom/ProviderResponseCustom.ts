export interface ResponseCustomResultItem {
  result_type: 'document' | 'person',
  result_url: string,
  result_title: string,
  result_description: string,
}

/**
 * Interface ProviderResponseCustom represents the payload that comes back from
 * the Custom Rest API.
 */
interface ProviderResponseCustom {
  results: {
    view_more_url: string,
    view_more_people_url?: string,
    view_more_documents_url?: string,
    result_set?: ResponseCustomResultItem[],
  },
}

export default ProviderResponseCustom;
