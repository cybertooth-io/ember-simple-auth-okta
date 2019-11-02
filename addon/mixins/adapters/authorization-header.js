import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

/**
 * Mixes in the `Authentication` header with the __Bearer AcCeSsToKeN__.
 *
 * @class AuthorizationHeader
 * @module ember-simple-auth-okta/mixins/authorization-header
 * @uses DataAdapterMixin
 * @public
 */
export default Mixin.create(DataAdapterMixin, {
  authorize(xhr) {
    if (this.session.isAuthenticated) {
      let { accessToken } = this.session.data.authenticated.accessToken;  // => your token!
      let { tokenType } = this.session.data.authenticated.accessToken;  // => Bearer

      xhr.setRequestHeader(this.configuration.headerAuthorization, `${tokenType} ${accessToken}`);
    }
  },

  configuration: service(),

  session: service()
});
