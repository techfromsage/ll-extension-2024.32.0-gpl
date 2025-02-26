export interface SciwheelUser {
  id: string,
  firstName: string,
  lastName: string,
  hasValidWorkbenchSubscription: boolean,
  hasTrialAccess: boolean,
  hasAnyAnnotations: boolean,
  apiToken: {
    value: string,
    type: string,
  },
  primeContributor: boolean,
  workbenchBeta: boolean,
  deleted: boolean,
}
