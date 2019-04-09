# Ember Data Adapter Configuration

In the spirit of Ember Simple Auth providing an adapter mixin for
including your token in your data-adapter request header, we also
provide one.  Mix it into your application adapter.

If you haven't already configured your application adapter, use
the ember-cli generator to create it:

{{#docs-snippet name="shell" title="Your Terminal"}}
  ember g adapter application
{{/docs-snippet}}

Then simply import and extend our adapter:

{{#docs-snippet name="adapter" title="app/adapters/application.js"}}
  import DS from 'ember-data';
  import AuthorizationHeader from 'ember-simple-auth-okta/mixins/adapters/authorization-header';
  
  export default DS.JSONAPIAdapter.extend(AuthorizationHeader, {
    // your additional adapter code here!
  });
{{/docs-snippet}}
