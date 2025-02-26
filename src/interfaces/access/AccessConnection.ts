/**
 * Interface AccessConnection represents the connection state for a URL.
 * i.e. Is the current URL within the Resource Domain and connected.
 */
import ResourceDomain from '@/interfaces/access/ResourceDomain';

interface AccessConnection {
  resource?: ResourceDomain,
  supported: boolean,
  connected: boolean,
}

export default AccessConnection;
