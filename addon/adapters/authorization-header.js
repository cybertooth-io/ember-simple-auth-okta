import { inject as service } from '@ember-decorators/service';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import DS from 'ember-data';

const { Adapter } = DS;

export default class AuthorizationHeaderAdapter extends Adapter.extend(DataAdapterMixin) {
  @service configuration;
  @service session;

  authorize(xhr) {
    if (this.get('session.isAuthenticated')) {
      const accessToken = this.session.data.authenticated.accessToken.accessToken;  // => your token!
      const tokenType = this.session.data.authenticated.accessToken.tokenType;  // => Bearer

      xhr.setRequestHeader(this.configuration.headerAuthorization, `${tokenType} ${accessToken}`);
    }
  }
}
