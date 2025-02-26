import ManagedDomain from '@/modules/shared/notifications/ManagedDomain';
import eventAutoRedirect from '@/modules/stats/access/eventAutoRedirect';
import AccessLoginUrl from '@/modules/shared/stateMachine/context/AccessLoginUrl';
import HasDuplicateURLInSearchParams from '@/modules/shared/HasDuplicateURLInSearchParams';
import AccessConnection from '@/interfaces/access/AccessConnection';
import Institution from '@/interfaces/Institution';
import { NotificationMetadata } from '@/interfaces/ui/NotificationUI';
import AppSettings from '@/interfaces/AppSettings';
import { SessionStoreState } from '@/store';
import ResourceDomainTypes from '@/enums/ResourceDomainTypes';

const AUTO_REDIRECT_LIMIT = 5;

export default (
  currentUrl: URL,
  accessConnections: AccessConnection[],
  appSettings: AppSettings,
  sessionStore: Pick<SessionStoreState, 'autoRedirectCount' | 'incrementAutoRedirectCount' >,
  browserRedirect: (urlTo: string, institution: Institution, metadata?: NotificationMetadata) => void,
  onRedirectLoop: () => void,
) => {
  const { isBlocked } = ManagedDomain(appSettings, currentUrl.hostname);
  const isAuthenticated = accessConnections.some(({ connected }) => connected);
  const { incrementAutoRedirectCount, autoRedirectCount } = sessionStore;

  if (!appSettings.autoRedirect || appSettings.onCampus || isBlocked) {
    return;
  }

  if (autoRedirectCount >= AUTO_REDIRECT_LIMIT) {
    onRedirectLoop();
    return;
  }

  const accessConnection = accessConnections.find(({ supported }) => supported);
  if (!accessConnection?.resource) {
    return;
  }
  const { resource } = accessConnection;
  const access = resource.institution.access.find(({ type }) => type === resource.accessType);

  if (!access?.prefixUrl) {
    return;
  }

  if (isAuthenticated && access.type !== ResourceDomainTypes.Shibboleth) {
    return;
  }

  if (!HasDuplicateURLInSearchParams(currentUrl.toString())) {
    const urlTo = AccessLoginUrl(access.type, access.prefixUrl, currentUrl.href);
    incrementAutoRedirectCount();
    eventAutoRedirect(new URL(access.prefixUrl), access.type, resource.institution.id);
    browserRedirect(
      urlTo,
      resource.institution,
      { resourceDomain: accessConnection.resource },
    );
  }
};
