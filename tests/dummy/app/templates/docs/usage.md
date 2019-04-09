# Usage

## Signing In

Here's an example of what your `controller` (or `route`) action could look like
when authenticating:

{{#docs-snippet name="sign-in" title="app/controllers/sign-in.js"}}
  @service session; // the injected session
  
  // here's the action bound to your sign in form from the template
  @action signIn(username, password) {
    this.session.authenticate('authenticator:okta', username, password);
    return false;
  }
{{/docs-snippet}}

Once authenticated we'll put both Okta's `accessToken` and `idToken` into Ember
Simple Auth's `session.data`.

### What Is In My Session?

By default, your token information will be found in your browser's local storage.  Use your
browser's developer tools to walk each of the token's structure.

```json
{
  "authenticated": {
    "accessToken": {
      "accessToken": "some.garbly.goop",
      "exp": 1234567890,
      "tokenType": "Bearer",
      "moreAndMore": "and more"
    },
    "authenticator": "authenticator:okta",
    "idToken": {
      "claims": {
        "amr": ["pwd"],
        "aud": "aBcDeFgHiJkLmNoPqRsT",
        "auth_time": 1234567890,
        "email": "email@example.com",
        "email_verified": true,
        "exp": 1234567890,
        "moreAndMore": "and more"
      }
    }  
  }
}

```

### How Do I Access My Session Data?

Very easy, use the Ember Simple Auth injected `session` in your 
templates (or routes/controllers).

Say you want the signed in user's email address:

```handlebars
{{session.data.authenticated.idToken.claims.email}}
```

Or maybe you need the access token to pass to your API server:

{{#docs-snippet name="using-session-data" title="app/mixins/adapters/token-header.js"}}
  // ...
  
  @service session;

  authorize(xhr) {
    if (this.session.isAuthenticated) {
      const accessToken = this.session.data.authenticated.accessToken.accessToken;
      xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
    }
  }
{{/docs-snippet}}

_Isn't that double-`accessToken` redundant?  Yeah, but it's the way the data is shaped and 
how we named the keys.  Suck it up._

## Sign Out

Signing out follows Ember Simple Auth's `invalidate` procedure:

{{#docs-snippet name="sign-in" title="app/controllers/sign-in.js"}}
  @service session; // the injected session
  
  // here's the action bound to your sign out button/form
  @action signIn(username, password) {
    this.session.invalidate();
    return false;
  }
{{/docs-snippet}}

What does invalidate do?  It will:

1. Send a `DELETE` request to the Okta authentication server
to destroy the session 
1. Clear the storage that Ember Simple Auth used to collect 
your access and id token information


## Running This Demo Locally

Want to see this addon in action?  Pull down this repository and `ember s` the master branch.

That will run the _Dummy_ app that hosts all of this documentation and our acceptance
test pages.

If you checkout this addon's `tests/dummy/config/environment.js` you'll see the
configuration to our development instance of Okta.
