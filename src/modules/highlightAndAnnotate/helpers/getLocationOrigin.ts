/**
 * @returns {string} The origin of the current window location with the port if it exists
 */
const getLocationOrigin = () => {
  const {
    origin, protocol, hostname, port,
  } = window.location;

  // Early return if 'origin' exists
  if (origin) {
    return origin;
  }

  // Build the origin using protocol and hostname
  const baseOrigin = `${protocol}//${hostname}`;

  // Append port if it exists
  return port ? `${baseOrigin}:${port}` : baseOrigin;
};

export default getLocationOrigin;
