// tiny wrapper with default env vars

/**
 * Date stamp for build
 * @type {Date}
 */
const now = new Date();

const dayOfYear = date => {
  const nowUtc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const beginningUtc = Date.UTC(date.getFullYear(), 0, 0)
  return (nowUtc - beginningUtc) / 24 / 60 / 60 / 1000;
}

const minuteOfDay = date => {
  return date.getHours() * 60 + date.getMinutes();
}

/**
 * Version number for the build based on the current date and time.
 * @type {Array}
 */
const devVersionArray = [
  `${1000 + now.getFullYear()}`, // Add 1000 to the year so that visually we can tell if this is a development build.
  dayOfYear(now), // Day of the year
  minuteOfDay(now), // Minute of the day
];

const devVersion = process.env.PUBLISH_ENVIRONMENT === 'production' || !!process.env.CI_COMMIT_TAG
  ? ''
  : devVersionArray.join('.');

module.exports = {
  ASSET_PATH: process.env.ASSET_PATH || '/',
  BUILD_BROWSER: process.env.BUILD_BROWSER || 'chrome',
  BUILD_ENVIRONMENT: process.env.BUILD_ENVIRONMENT || 'production',
  CI_COMMIT_TAG: process.env.CI_COMMIT_TAG || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  PUBLISH_ENVIRONMENT: process.env.PUBLISH_ENVIRONMENT || 'production',
  PUBLISH_ID_FIREFOX: process.env.PUBLISH_ID_FIREFOX || '{}',
  PUBLISH_NAME: process.env.PUBLISH_NAME,
  SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN || '',
  VERSION: process.env.VERSION || devVersion,
};
