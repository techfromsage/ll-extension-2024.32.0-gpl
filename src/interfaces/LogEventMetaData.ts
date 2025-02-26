/**
 * Interface LogEventMetadata provides a mechanism to provide extra data to a log event.
 */
interface LogEventMetadata {
  contextName?: string,
  contextValue?: string,
}

export default LogEventMetadata;
