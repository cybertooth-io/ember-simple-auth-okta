# Installation

## Install Or Upgrade

{{#docs-snippet name="terminal-install" title="Terminal"}}
ember install ember-simple-auth-okta
{{/docs-snippet}}

## What Happens

1. `ember-simple-auth-okta` is downloaded and added to your project.
1. The latest `ember-simple-auth` is downloaded and installed into your project.
1. The latest version of `ember-auto-import` is downloaded and installed. This
   is used to pleasantly `import OktaAuth from '@okta/okta-auth-js';`
1. The latest version of `ember-concurrency` is installed because it is
   used to manage the timer that renews tokens obtained from Okta.
1. The latest version of `ember-decorators` is required because all of this module
   has been authored with native classes.
1. The latest version of `ember-decorators-polyfill` is installed to back-port the
   default decorators to Ember-2.18. Once Ember-3.10 is released, this decorator
   polyfill will no longer be required.
   [Issue In GitHub](https://github.com/cybertooth-io/ember-simple-auth-okta/issues/23).
1. `okta-auth-js` npm package is installed and we import the
   `import OktaAuth from '@okta/okta-auth-js';` in order to create the Okta Client
   that will be used to authenticate.

<div class="docs-bg-grey-lightest docs-border-l-4 docs-border-grey docs-text-grey-darker docs-p-4" role="alert">
  <p class="docs-font-bold">What If I Already Have These Addons/Packages?</p>
  <p>
    Well the short answer is they will be updated to their latest stable version.
  </p>
  <p>
    If this doesn't work for you, for example, you might want to stay on an older version
    of <code>ember-concurrency</code>.  Then in this case, I would adivse you to go into
    your package.json and revert back to the version of <code>ember-concurrency</code> that
    you need to remain on.  <strong>Will that break this addon?</strong>  Probably not.  We 
    don't do anything experimental or crazy with these additional depenendencies.
  </p>
  <p>
    I'd urge you to be very cautious in staying on old stale versions of NPM packages 
    and Ember addons. 
  </p>
</div>
