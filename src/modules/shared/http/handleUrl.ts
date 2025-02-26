/**
 *
 * @param {Response} response
 * @returns {string}
 */
export default <Payload>(response: Response) => {
  return Promise.resolve(response.url) as Promise<Payload>;
};
