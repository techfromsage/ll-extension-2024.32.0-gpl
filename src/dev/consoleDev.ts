/**
 * consoleDev provides an easy way to log to console without adding conditions in the code.
 */

type ConsoleType = 'log' | 'debug' | 'trace';

export default ({ message, title = '', type = 'log' }: { message: any, title?: string, type?: ConsoleType }): void => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  if (title) {
    console[type](title ? `📚LL ${title}` : '', message);
    return;
  }
  console[type](message);
};
