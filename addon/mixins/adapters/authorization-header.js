import { inject as service } from '@ember/service';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import Mixin from '@ember/object/mixin';

export default Mixin.create(DataAdapterMixin, {
  authorize(xhr) {
    if (this.session.isAuthenticated) {
      const accessToken = this.session.data.authenticated.accessToken.accessToken;  // => your token!
      const tokenType = this.session.data.authenticated.accessToken.tokenType;  // => Bearer

      xhr.setRequestHeader(this.configuration.headerAuthorization, `${tokenType} ${accessToken}`);
    }
  },

  configuration: service(),

  session: service()
});
