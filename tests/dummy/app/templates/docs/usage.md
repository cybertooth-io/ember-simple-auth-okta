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

### What Does My Session Contain?

By default, your token information will be found in your browser's local storage.  Use your
browser's developer tools to walk the token's structure.

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

Very easy, use the Ember Simple Auth's injected `session` in your 
template (or adapter/controller/route).

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

### Will My Token Renew Automagically?

Yes!  Rather than use `okta-auth-js`'s [TokenManager](https://github.com/okta/okta-auth-js#tokenmanager) 
for auto-refresh, we opted to use an `ember-concurrency` task to trigger a refresh of 
the token prior to it expiring.

Our Ember Simple `Authenticator` implementation will _perform_ a task
in order to renew.  This task will pause/wait until the access token is set to expire.  At 
this moment in time the token renewal request will be sent to your Okta endpoint 
and if successful your tokens will be updated in your session.  If the renewal 
request fails, then Ember Simple Auth will clear your session, which if you're using 
Ember Simple Auth correctly, will kick your user to the login page.   

<div class="docs-bg-grey-lightest docs-border-l-4 docs-border-grey docs-text-grey-darker docs-p-4" role="alert">
  <p class="docs-font-bold"><code>okta-auth-js</code> Token Manager Was Clunky</p>
  <ol>
    <li>
      When forcibly asked to renew a token directly from the token manager it
      did not then update its reference to the now fresh token.  We'd
      have to actually add this refreshed token to the manager replacing the old one.
      That just seemed weird.
    </li>
    <li>
      When signing out using <code>octa-auth-js</code>'s Client instance, it didn't clear
      the token manager's cache.  We found that we had to do that ourselves and it
      just seemed inconvenient.
    </li>
  </ol>
</div>


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
