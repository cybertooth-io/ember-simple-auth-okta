# Configuration

In your `config/environment.js` you should add your Okta Client configuration to the `APP` section as
depicted below:

{{#docs-snippet name="environment-config" title="config/environment.js"}}
  'use strict';
  
  module.exports = function (environment) {
    let ENV: {
      // ...
      APP: {
        'ember-simple-auth-okta': {
          /**
           * This is the exact `config` hash that will be passed into your `OktaAuth` instance.
           * Customize accordingly.
           * @see https://github.com/okta/okta-auth-js#configuration-reference
           */
          config: {
            // Url to your Okta instance
            url: 'https://dev-000000.okta.com'

            // Optional config
            //issuer: 'https://{yourOktaDomain}/oauth2/default',
            //clientId: 'GHtf9iJdr60A9IYrR0jw',
            //redirectUri: 'https://acme.com/oauth2/callback/home',
          
            // Override the default authorize and userinfo URLs
            //authorizeUrl: 'https://{yourOktaDomain}/oauth2/default/v1/authorize',
            //userinfoUrl: 'https://{yourOktaDomain}/oauth2/default/v1/userinfo',
          
            // TokenManager config
            //tokenManager: {
            //  storage: 'sessionStorage'
            //}
          }
        }
      // ...
      }
      // ...
    }
    // ...
    return ENV;
  }
{{/docs-snippet}}
