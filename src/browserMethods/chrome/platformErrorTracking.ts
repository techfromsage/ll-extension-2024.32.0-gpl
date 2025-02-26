/**
 * Platform Error Tracking e.g. Sentry setup.
 */
import escapeRegExp from 'lodash.escaperegexp';
import * as Sentry from '@sentry/browser';
import { StoreState } from '@/store';
import browserMethods from '@/browserMethods';
import PlatformErrorTracking from '@/interfaces/PlatformErrorTracking';

/**
 * Adds Sentry error logging if enabled.
 */
const platformErrorTracking: PlatformErrorTracking = {
  initialise: (store: StoreState) => {
    if (!store.config || !store.appSettings.logging_enabled) {
      return;
    }

    Sentry.init({
      dsn: store.config.sentry.dsn,
      environment: store.config.environment,
      tracesSampleRate: 1.0,
      release: store.config.version,
      integrations: [
        new Sentry.BrowserTracing(),
      ],
      ignoreErrors: [
        'ResizeObserver loop limit exceeded',
        'ResizeObserver loop completed with undelivered notifications.',
      ],
      allowUrls: [
        new RegExp(escapeRegExp(browserMethods.runtime.getURL('/')), 'i'),
      ],
    });

    Sentry.configureScope(scope => {
      scope.setUser({ id: store.clientId });
      store.institutes.forEach((institute, index) => {
        const tagId = index === 0 ? 'institution.primary.id' : 'institution.secondary.id';
        const tagName = index === 0 ? 'institution.primary.name' : 'institution.secondary.id';
        scope.setTag(tagId, institute.id);
        scope.setTag(tagName, institute.name);
      });
    });
  },
};

export default platformErrorTracking;
