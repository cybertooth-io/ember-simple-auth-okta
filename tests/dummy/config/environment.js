'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'dummy',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
        EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      'ember-simple-auth-okta': {
        /**
         * This is the exact `config` hash that will be passed into your `OktaAuth` instance.
         * Customize accordingly.
         * @see https://github.com/okta/okta-auth-js#configuration-reference
         */
        config: {
          /**
           * This is one of Cybertooth.io's dev Okta instances.
           */
          url: 'https://dev-308387.okta.com',
          issuer: 'https://dev-308387.okta.com/oauth2/default',
          clientId: '0oafawjkwfqlC9Yxc356',
          redirectUri: 'http://localhost:4200/implicit/callback',
          /**
           * Ember Simple Auth does best with local storage.
           * `localStorage` is the default but we're going to explicitly
           * state this here so that you don't change it because this addon
           * does not currently support session or cookie storage.
           */
          tokenManager: {
            storage: 'localStorage'
          }
        },

        /**
         * The name of the header to be attached to adapter data requests.
         */
        headerAuthorization: 'Authorization',

        /**
         * This is the array of scopes that will be supplied when requesting the
         * id token.
         */
        idTokenScopes: ['email', 'openid', 'profile']
      }
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
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // Allow ember-cli-addon-docs to update the rootURL in compiled assets
    ENV.rootURL = 'ADDON_DOCS_ROOT_URL';

    // so that our GitHub demo will authenticate, we have to override the redirectUri
    ENV.APP['ember-simple-auth-okta'].config.redirectUri = 'https://cybertooth-io.github.io/implicit/callback';
  }

  return ENV;
};
