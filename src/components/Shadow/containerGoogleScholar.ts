/**
 * ContainerGoogleScholar - Obtains the right-hand side container of the Google search results page.
 */

export default () => {
  const container = document.querySelector<HTMLElement>('#gs_bdy_ccl');
  if (!container) {
    return null;
  }
  /* eslint-disable no-param-reassign */
  container.style.display = 'flex';
  const resultsContainer = document.querySelector<HTMLElement>('#gs_res_ccl');
  if (resultsContainer) {
    resultsContainer.style.flex = '2';
  }
  return container;
};
