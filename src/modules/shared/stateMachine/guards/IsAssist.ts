/**
 * Checks if assist state is valid.
 *
 * Relating to: Assist.
 *
 * This state is achieved if an assist message exists
 */
import State from '@/enums/State';
import IsStateAllowed from '@/modules/shared/stateMachine/guards/IsStateAllowed';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';

export default (context: FeaturesContext): boolean => {
  return context.assistMessage !== undefined
    && IsStateAllowed(context.assistMessage.institution.id, State.Assist, context.allowedStates);
};
