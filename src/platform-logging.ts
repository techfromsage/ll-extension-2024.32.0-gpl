/**
 * Platform logging e.g. Datadog logs setup.
 */
import { datadogLogs } from '@datadog/browser-logs';
import LogEventType from '@/enums/LogEventType';
import LogEventMetadata from '@/interfaces/LogEventMetaData';
import { store } from '@/store';
import { Config } from '@/interfaces/Config';

const initialise = (config: Config) => {
  datadogLogs.init({
    clientToken: config.datadog.clientToken,
    site: config.datadog.site,
    service: config.datadog.service,
    version: config.version,
    forwardErrorsToLogs: true,
    sampleRate: 100,
  });
};

const createLoggers = () => Object.keys(LogEventType).map(name => datadogLogs.createLogger(name));

store.persist.onFinishHydration(state => {
  initialise(state.config as Config);
  createLoggers();
});

export default (name: LogEventType, event?: LogEventMetadata) => {
  const logger = datadogLogs.getLogger(name);
  if (event?.contextName && event?.contextValue) {
    logger?.addContext(event.contextName, event.contextValue);
  }
  return {
    debug: (message: string) => logger?.debug(message),
    info: (message: string) => logger?.info(message),
    warn: (message: string) => logger?.warn(message),
    error: (message: string) => logger?.error(message),
  };
};
