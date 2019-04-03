import Controller from '@ember/controller';
import { inject as service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';

export default class DocsDemoIndexController extends Controller {
  @service session;
  username = 'Sterling';
  password = '';

  @action login(username, password){
    console.info('Trying to login!', this.session.isAuthenticated);
    this.session.authenticate('authenticator:okta', username, password);
    return false;
  }
}
