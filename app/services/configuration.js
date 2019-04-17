import config from '../config/environment';
import Service from '@ember/service';
import { getWithDefault } from '@ember/object';

/**
 * A singleton service configuration that will pull in the `config/environment.js` properties and
 * settings that are used to authenticate with the Okta services.
 *
 * @class Configuration
 * @module ember-simple-auth-okta/services/configuration
 * @extends Service
 * @public
 */
export default class ConfigurationService extends Service {

  /** Constructor
   * ---------------------------------------------------------------------------------------------------------------- */

  constructor() {
    super();
    this._oktaConfigHash = getWithDefault(
      config, 'APP.ember-simple-auth-okta.config', { url: 'https://dev-000000.okta.com' }
    );
    this._headerAuthorization = getWithDefault(
      config, 'APP.ember-simple-auth-okta.headerAuthorization', 'Authorization'
    );
    this._idTokenScopes = getWithDefault(
      config, 'APP.ember-simple-auth-okta.idTokenScopes', ['email', 'openid']
    );
    // TODO: need to capture the rest of the configuration attributes, assign them to member variables & create getter/setters
  }

  /** Getters & Setters
   * ---------------------------------------------------------------------------------------------------------------- */

  get oktaConfigHash() {
    return this._oktaConfigHash;
  }

  get headerAuthorization() {
    return this._headerAuthorization;
  }

  get idTokenScopes() {
    return this._idTokenScopes;
  }
}
