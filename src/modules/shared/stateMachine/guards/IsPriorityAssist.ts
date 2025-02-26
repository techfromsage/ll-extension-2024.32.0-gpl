/**
 * Checks if priorityAssist state is valid.
 *
 * Relating to: Assist.
 *
 * This state is achieved if an assist message with a priority flag is found for the current URL.
 */
import State from '@/enums/State';
import IsStateAllowed from '@/modules/shared/stateMachine/guards/IsStateAllowed';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';

export default (context: FeaturesContext): boolean => {
  return (context.assistMessage?.priority || false)
    && IsStateAllowed(context.assistMessage.institution.id, State.PriorityAssist, context.allowedStates);
};
