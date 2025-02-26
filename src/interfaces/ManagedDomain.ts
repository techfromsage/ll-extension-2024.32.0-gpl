/**
 * Interface ManagedDomain tracks if the domain which the user is on is blocked or not.
 * True the domain is blocked, false the domain is not blocked.
 */

interface ManagedDomain {
  domain: string,
  isBlocked: boolean,
}

export default ManagedDomain;
