import { StoreState } from '@/store';

interface ClientId {
  generate: () => string,
}

/**
 * Generates a unique client ID if necessary.
 *
 * Each client needs a unique clientId for logging and stats
 *
 * @param clientId
 * @param generateClientId
 */
export default (
  state: {
    clientId: StoreState['clientId'],
    generateClientId: StoreState['generateClientId'],
  },
): ClientId => ({
  generate: () => (state.clientId.length ? state.clientId : state.generateClientId()),
});
