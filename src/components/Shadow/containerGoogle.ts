/**
 * Obtains the right-hand side container of the Google search results page.
 */
export default () => {
  const rhs = document.querySelector<HTMLElement>('#rhs');
  if (rhs) {
    return rhs;
  }
  const centerCol = document.querySelector<HTMLElement>('#center_col');
  const rhsCol = document.createElement('div') as HTMLElement;
  rhsCol.id = 'rhs';
  centerCol?.insertAdjacentElement('afterend', rhsCol);
  return rhsCol;
};
