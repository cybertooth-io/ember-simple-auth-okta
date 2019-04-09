import EmberObject from '@ember/object';
import AdaptersAuthorizationHeaderMixin from 'ember-simple-auth-okta/mixins/adapters/authorization-header';
import { module, test } from 'qunit';

module('Unit | Mixin | adapters/authorization-header', function () {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let AdaptersAuthorizationHeaderObject = EmberObject.extend(AdaptersAuthorizationHeaderMixin);
    let subject = AdaptersAuthorizationHeaderObject.create();
    assert.ok(subject);
  });
});
