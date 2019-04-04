# Configuration

In your `config/environment.js` you should add your Okta Client configuration to the `APP` section as
depicted below:

{{#docs-snippet name="environment-config" title="config/environment.js"}}
  // ...
  APP: {
    // Here you can pass flags/options to your application instance
    // when it is created
    'ember-simple-auth-okta': {
      url: 'https://{yourOktaDomain}',
    
      // Optional config
      issuer: 'https://{yourOktaDomain}/oauth2/default',
      clientId: 'GHtf9iJdr60A9IYrR0jw',
      redirectUri: 'https://acme.com/oauth2/callback/home',
    
      // Override the default authorize and userinfo URLs
      authorizeUrl: 'https://{yourOktaDomain}/oauth2/default/v1/authorize',
      userinfoUrl: 'https://{yourOktaDomain}/oauth2/default/v1/userinfo',
    
      // TokenManager config
      tokenManager: {
        storage: 'sessionStorage'
      }
    }
  }
  // ...
{{/docs-snippet}}
