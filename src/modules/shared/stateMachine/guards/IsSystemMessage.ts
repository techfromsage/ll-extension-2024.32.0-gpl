/**
 * Checks if system message state is valid.
 *
 * Relating to: SystemMessage.
 *
 * This state is achieved if a system message exists
 */
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';

export default (context: FeaturesContext): boolean => {
  return context.systemMessage !== undefined;
};
