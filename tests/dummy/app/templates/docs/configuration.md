# Configuration

In your Ember **App**'s `config/environment.js` you should add your Okta Client configuration to 
the `APP` section as depicted below:

{{#docs-snippet name="environment-config" title="config/environment.js"}}
  'use strict';
  
  module.exports = function (environment) {
    let ENV = {
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
            issuer: 'https://dev-000000.okta.com/oauth2/default',
            clientId: 'aBcDeFgHiJkLmNoPqRsT',
            /**
             * This should actually be your Ember App's URL.
             */
            redirectUri: 'https://localhost:4200/implicit/callback',
          
            /**
             * Ember Simple Auth does best with local storage.
             * `localStorage` is the default but we're going to explicitly
             * state this here so that you don't change it because this addon
             * does not currently support session or cookie storage.
             */
            tokenManager: {
              storage: 'localStorage'
            }
          }
        }
      // ...
      }
      // ...
    };
    // ...
    return ENV;
  }
{{/docs-snippet}}

## Local vs. Session vs. Cookie

What's best?  Doesn't matter.  **We're only supporting local storage
for this addon at this time.**  Want session or cookie, fork and submit
a PR.

# Running This Demo Locally

Want to see this addon in action?  Pull down this repository and `ember s` the master branch.

That will run the _Dummy_ app that hosts all of this documentation and our acceptance
test pages.

If you checkout this addon's `tests/dummy/config/environment.js` you'll see the
configuration to our development instance of Okta.
