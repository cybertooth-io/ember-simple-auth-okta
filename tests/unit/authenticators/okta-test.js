import { module, skip, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';
import OktaAuthenticator from 'ember-simple-auth-okta/authenticators/okta'

var CLOCK;

module('Unit | Authenticator | okta', function (hooks) {
  setupTest(hooks);

  hooks
    .afterEach(function () {
      if (CLOCK) {
        CLOCK.restore();
      }
    });

  // TODO: this test will not work in 2.18?
  skip('it exists', function (assert) {
    let authenticator = this.owner.lookup('authenticator:okta');
    assert.ok(authenticator);
  });

  test('when one second before expires at', function (assert) {
    CLOCK = sinon.useFakeTimers(new Date(2001, 8, 11).getTime()); // Sept 11, 2001 00:00:00
    const expiresAt = new Date(2001, 8, 11, 0, 0, 1).valueOf() / 1000; // Sept 11, 2001 00:00:01
    assert.notOk(OktaAuthenticator._isExpired(expiresAt));
  });

  test('when exactly expires at', function (assert) {
    CLOCK = sinon.useFakeTimers(new Date(2001, 8, 11, 0, 0, 1).getTime()); // Sept 11, 2001 00:00:01
    const expiresAt = new Date(2001, 8, 11, 0, 0, 1).valueOf() / 1000; // Sept 11, 2001 00:00:01
    assert.ok(OktaAuthenticator._isExpired(expiresAt));
  });

  test('when one second after expires at', function (assert) {
    CLOCK = sinon.useFakeTimers(new Date(2001, 8, 11, 0, 0, 2).getTime()); // Sept 11, 2001 00:00:02
    const expiresAt = new Date(2001, 8, 11, 0, 0, 1).valueOf() / 1000; // Sept 11, 2001 00:00:01
    assert.ok(OktaAuthenticator._isExpired(expiresAt));
  });
});
