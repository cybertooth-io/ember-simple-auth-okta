import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DocsDemoIndexController extends Controller {
  /**
   * Ember Simple Auth's injected `session` service.
   */
  @service session;

  /**
   * The password bound to the input in the template.
   * @type {string}
   */
  password = '@Rcher12';

  /**
   * The username bound to the input in the template.
   * @type {string}
   */
  username = 'sterling.archer@isi.service';

  /**
   * The sign-in action invoked by the form in the template.
   * @param username the supplied username.
   * @param password the supplied password.
   * @return {boolean} true to bubble up the DOM event tree, false otherwise.  We do not bubble
   * because this action is bound to a `<form>` element's `onsubmit` event and we don't want the page to
   * reload when the form is submitted.
   * @public
   */
  @action login(username, password) {
    this.session.authenticate('authenticator:okta', username, password);
    return false;
  }

  /**
   * The logout action invoked by the logout button in the template.
   * @return {boolean} true to bubble up the DOM event tree, false otherwise.
   * @public
   */
  @action logout() {
    this.session
      .invalidate()
      .catch((response) => {
        console.warn('The session could not be logged out', response);
      });
    return false;
  }
}
