import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  restore(data) {
  },

  authenticate(username, password) {
    console.info('Credentials', username, password);

  },

  invalidate(data) {
  }
});
