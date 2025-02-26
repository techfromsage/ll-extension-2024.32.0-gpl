/**
 * Real user monitoring (RUM) setup.
 */
import { datadogRum } from '@datadog/browser-rum';
import { Config } from '@/interfaces/Config';

export default (config: Config) => ({
  initialise: () => {
    datadogRum.init({
      applicationId: config.datadog.rumApplicationId,
      clientToken: config.datadog.rumClientToken,
      site: config.datadog.site,
      service: config.datadog.service,
      version: config.version,
      sampleRate: 100,
      trackInteractions: true,
      defaultPrivacyLevel: 'mask-user-input',
    });
  },
});
