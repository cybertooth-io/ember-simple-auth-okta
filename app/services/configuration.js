import config from '../config/environment';
import Service from '@ember/service';
import { getWithDefault } from '@ember/object';

export default class ConfigurationService extends Service {
  constructor() {
    super();
    this._oktaConfigHash = getWithDefault(
      config, 'APP.ember-simple-auth-okta.config', { url: 'https://dev-000000.okta.com' }
    );
    // TODO: need to capture the rest of the configuration attributes, assign them to member variables & create getter/setters
  }

  get oktaConfigHash() {
    return this._oktaConfigHash;
  }

  set oktaConfigHash(value) {
    this._oktaConfigHash = value;
  }
}
