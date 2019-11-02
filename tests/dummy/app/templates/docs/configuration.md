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
_ This is the exact `config` hash that will be passed into your `OktaAuth` instance.
_ Customize accordingly.
_ @see https://github.com/okta/okta-auth-js#configuration-reference
_/
config: {
// Url to your Okta instance
url: 'https://dev-000000.okta.com',
issuer: 'https://dev-000000.okta.com/oauth2/default',
clientId: 'aBcDeFgHiJkLmNoPqRsT',
/**
_ This should actually be your Ember App's URL.
_/
redirectUri: 'http://localhost:4200/implicit/callback',

/\*\*
_ Ember Simple Auth does best with local storage.
_ `localStorage` is the default but we're going to explicitly
_ state this here so that you don't change it because this addon
_ does not currently support session or cookie storage.
\*/
tokenManager: {
storage: 'localStorage'
}
},

/\*\*
_ The name of the header to be attached to adapter data requests.
_/
headerAuthorization: 'Authorization',

/\*\*
_ This is the array of scopes that will be supplied when requesting the
_ id token.
\*/
idTokenScopes: ['email', 'openid']
}
// ...
}
// ...
};
// ...
return ENV;
}
{{/docs-snippet}}

## What's In This Configuration?

`APP.ember-simple-auth-okta.config` - contains all of your endpoint details
that your administrator can get for you from the Okta administration console.

`APP.ember-simple-auth-okta.headerAuthorization` - the name of the authorization
header that will be set in requests to the Ember Data endpoint. This is typically
named `Authorization` and will look like this when sent to your API end point:
`Authorization: "Bearer sOmEtOkEn"`.

`APP.ember-simple-auth-okta.idTokenScopes` - is the array of scopes that will
be included in the id token when it is requested.

## Storage - Local vs. Session vs. Cookie

What's best? Doesn't matter. **We're only supporting local storage
for this addon at this time.** Want session or cookie, fork and submit
a PR.
