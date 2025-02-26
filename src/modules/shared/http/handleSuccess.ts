import handleFailure from '@/modules/shared/http/handleFailure';

/**
 *
 * @param {Response} response
 * @returns {Promise<Payload>}
 */
export default <Payload>(response: Response): Promise<Payload> => {
  if (!response.ok) {
    handleFailure(response);
  }
  const contentType = response.headers.get('content-type');
  return contentType && contentType.includes('application/json')
    ? response.json()
    : response.text() as Promise<Payload>;
};
