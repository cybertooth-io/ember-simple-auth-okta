import Base from 'ember-simple-auth/authenticators/base';
import OktaAuth from '@okta/okta-auth-js';

export default Base.extend({

  _client: undefined,

  init(){
    this._super(...arguments);
    this._client = new OktaAuth({
      url: '',
    });
  },

  restore(data) {
  },

  authenticate(username, password) {
    return this._client
      .signIn({
        username,
        password
      });
  },

  invalidate(/*data*/) {
    return this._client
      .signOut();
  }
});
