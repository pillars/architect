/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'architect',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    contentSecurityPolicyHeader: 'Content-Security-Policy',
    contentSecurityPolicy: {
      'default-src': ["'none'"].join(' '),
      'script-src':  ["'self'", "localhost:4200"].join(' '),
      'font-src':    ["'self'"].join(' '),
      'connect-src': ["'self'"].join(' '),
      'img-src':     ["'self'"].join(' '),
      'style-src':   ["'self'", "'unsafe-inline'", "localhost:4200"].join(' '),
      'media-src':   ["'self'"].join(' ')
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
