import LayoutEvent from '@/enums/stateMachine/LayoutEvent';

/**
 * resizeObserver registers a listener that fires whenever the window resizes.
 *
 * We use this to update the layout state machine to rerender when the window maximises or minimises.
 */
export default () => {
  new ResizeObserver(entries => {
    window.requestAnimationFrame(() => {
      if (!entries?.length) {
        return;
      }
      const { clientWidth } = document.documentElement;
      window.stateInterpreterLayout.send(LayoutEvent.WindowResize, { windowWidth: clientWidth });
    });
  }).observe(window.document.body);
};
