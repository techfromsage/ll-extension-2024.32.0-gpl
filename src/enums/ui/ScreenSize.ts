/**
 * Enum ScreenSize standardises the different screen size bands for the browser.
 * Detected and set within StateMachineLayout
 */
enum ScreenSize {
  Idle = 'idle',
  Small = 'small-screen', // <= 1336px
  Medium = 'medium-screen', // > 1336px || <= 1920px
  Large = 'large-screen', // > 1920px
}

export default ScreenSize;
