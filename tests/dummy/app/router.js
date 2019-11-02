import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

const Router = AddonDocsRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  docsRoute(this, function() {
    this.route('adapter');
    this.route('configuration');
    this.route('demos', function() {
    });
    this.route('okta');
    this.route('usage');
  });
  this.route('docs');
  this.route('not-found', { path: '/*path' });
});

export default Router;
