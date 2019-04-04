import config from '../config/environment';
import Service from '@ember/service';
import { getWithDefault } from '@ember/object';

export default class ConfigurationService extends Service {
  constructor() {
    super();
    this._url = getWithDefault(
      config, 'APP.ember-simple-auth-okta.url', 'https://dev-012345.oktapreview.com/'
    );
    // TODO: need to capture the rest of the configuration attributes, assign them to member variables & create getter/setters
  }

  get url() {
    return this._url;
  }

  set url(value) {
    this._url = value;
  }
}
