import Annotation from '@/interfaces/highlightAndAnnotate/Annotation';
import { SciwheelUser } from '@/interfaces/sciwheel/SciwheelUser';

const determineAuthorText = (author: Annotation['author'], user: SciwheelUser | undefined) => {
  if (author.id === user?.id) {
    return 'You';
  }
  return `${author.firstName} ${author.lastName}`;
};

export default determineAuthorText;
