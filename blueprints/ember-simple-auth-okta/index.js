'use strict';

module.exports = {
  description: 'Ember Simple Auth implementation wrapping `okta-auth-js`.',

  name: 'ember-simple-auth-okta',

  normalizeEntityName() {
  }, // no-op since we're just adding dependencies

  afterInstall(/* options*/) {
    return this.addAddonsToProject({
      packages: [
        { name: 'ember-auto-import' },
        { name: 'ember-concurrency' },
        { name: 'ember-decorators-polyfill' },
        { name: 'ember-simple-auth' }
      ]
    }).then(() => {
      return this.addPackagesToProject([
        { name: '@okta/okta-auth-js' }
      ]);
    });
  }
};
