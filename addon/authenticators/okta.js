import { inject as service } from '@ember/service';
import Base from 'ember-simple-auth/authenticators/base';
import OktaAuth from '@okta/okta-auth-js';

// TODO: convert this to an actual Native Class to see if it is happy
// export default class Okta extends Base {
//   // ... fix all member variables & commas
// }
export default Base.extend({

  _client: undefined,

  /**
   * The `configuration` service is used to lookup the Okta configuration
   * from our Application's `config/environment.js` files `APP` section.
   * See configuration.md.
   */
  configuration: service(),

  /**
   * Instance Constructor/Initializer is responsible for creating an instance of the OktaAuth client.
   */
  init() {
    this._super(...arguments);
    // TODO: round out the configuration of Okta by grabbing additonal attribute from `configuration` service
    this._client = new OktaAuth({
      url: this.get('configuration').url,
    });
  },

  /**
   * Restores the session from a session data object. __This method is invoked
   * by the session either on application startup if session data is restored
   * from the session store__ or when properties in the store change due to
   * external events (e.g. in another tab) and the new session data needs to be
   * validated for whether it constitutes an authenticated session.
   *
   * __This method returns a promise. A resolving promise results in the session
   * becoming or remaining authenticated.__ Any data the promise resolves with
   * will be saved in and accessible via the session service's
   * `data.authenticated` property (see
   * {{#crossLink "SessionService/data:property"}}{{/crossLink}}). A rejecting
   * promise indicates that `data` does not constitute a valid session and will
   * result in the session being invalidated or remaining unauthenticated.
   *
   * The `BaseAuthenticator`'s implementation always returns a rejecting
   * promise. __This method must be overridden in subclasses.__
   *
   * @param {Object} data The data to restore the session from
   * @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming or remaining authenticated
   * @public
   */
  restore(/*data*/) {
    // TODO
  },

  /**
   * Authenticates the session with the specified `args`. These options vary
   * depending on the actual authentication mechanism the authenticator
   * implements (e.g. a set of credentials or a Facebook account id etc.). __The
   * session will invoke this method in order to authenticate itself__ (see
   * {{#crossLink "SessionService/authenticate:method"}}{{/crossLink}}).
   *
   * __This method returns a promise. A resolving promise will result in the
   * session becoming authenticated.__ Any data the promise resolves with will
   * be saved in and accessible via the session service's `data.authenticated`
   * property (see {{#crossLink "SessionService/data:property"}}{{/crossLink}}).
   * A rejecting promise indicates that authentication failed and will result in
   * the session remaining unauthenticated.
   *
   * The `BaseAuthenticator`'s implementation always returns a rejecting promise
   * and thus never authenticates the session. __This method must be overridden
   * in subclasses__.
   *
   * @param username
   * @param password
   * @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
   * @public
   */
  authenticate(username, password) {
    return this._client.signIn({ username, password });
  },

  /**
   * This method is invoked as a callback when the session is invalidated. While
   * the session will invalidate itself and clear all authenticated session data,
   * it might be necessary for some authenticators to perform additional tasks
   * (e.g. invalidating an access token on the server side).
   *
   * __This method returns a promise. A resolving promise will result in the
   * session becoming unauthenticated.__ A rejecting promise will result in
   * invalidation being intercepted and the session remaining authenticated.
   *
   * The `BaseAuthenticator`'s implementation always returns a resolving promise
   * and thus never intercepts session invalidation. __This method doesn't have
   * to be overridden in custom authenticators__ if no actions need to be
   * performed on session invalidation.
   *
   * @param {Object} data The current authenticated session data
   * @param {Array} ...args additional arguments as required by the authenticator
   * @return {Ember.RSVP.Promise} A promise that when it resolves results in the session being invalidated
   * @public
   */
  invalidate(/*data*/) {
    return this._client.signOut();
  }
});
