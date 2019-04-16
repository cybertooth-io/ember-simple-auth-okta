import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
import OktaAuth from '@okta/okta-auth-js';

export default class Okta extends BaseAuthenticator {

  /**
   * The Okta client instantiated in the constructor
   * @type {OktaAuth}
   * @private
   */
  _client = undefined;

  /**
   * The `configuration` service is used to lookup the Okta configuration
   * from our Application's `config/environment.js` files `APP` section.
   * See configuration.md.
   */
  @service configuration;
  /**
   * TODO: https://github.com/cybertooth-io/ember-simple-auth-okta/issues/9
   * @param exp
   * @return {IterableIterator<Ember.RSVP.Promise|void|*>}
   * @private
   */
  @task(function* (exp) {
    const wait = exp * 1000 - Date.now();
    console.warn('Scheduled authentication token refresh will occur at ', new Date(exp * 1000));

    yield timeout(wait);

    console.warn('Commencing refresh of the authentication tokens at ', new Date());
    return getOwner(this).lookup('session:main').restore();   // TODO: this.restore() won't work...ideally use `this.trigger('sessionDataUpdated')` but the evented approach is not firing!
  }) _renewTokensBeforeExpiry;

  /**
   * Instance Constructor/Initializer is responsible for creating an instance of the OktaAuth client.
   */
  constructor() {
    super(...arguments);
    this._client = new OktaAuth(this.configuration.oktaConfigHash);
  }

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
  async restore({ accessToken, idToken }) {
    const newAccessToken = await this._client.token.renew(accessToken);
    const newIdToken = await this._client.token.renew(idToken);

    this._renewTokensBeforeExpiry.cancelAll();
    this._renewTokensBeforeExpiry.perform(newAccessToken.expiresAt);

    return Promise.resolve({ accessToken: newAccessToken, idToken: newIdToken });
  }

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
  async authenticate(username, password) {
    const sessionInfo = await this._client.signIn({ username, password });
    const [accessToken] = await this._client.token.getWithoutPrompt({
      responseType: ['token'],
      sessionToken: sessionInfo.sessionToken
    });
    const [idToken] = await this._client.token.getWithoutPrompt({
      responseType: ['id_token'],
      scopes: this.configuration.idTokenScopes,
      sessionToken: sessionInfo.sessionToken
    });

    this._renewTokensBeforeExpiry.cancelAll();
    this._renewTokensBeforeExpiry.perform(accessToken.expiresAt);

    return Promise.resolve({ accessToken, idToken });
    // TODO: return a JSONAPI formatted error object?  I think that will make it easier on the front end
  }

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
    this._renewTokensBeforeExpiry.cancelAll();
    return this._client.signOut();
  }
}