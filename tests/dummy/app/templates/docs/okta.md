# Okta

This section is for people who need some help getting Okta configured.

## Need A Development Instance?

Yes!  You should try to authenticate with a development instance before you do
it live like Bill O'Reilly.

[Create your development Okta instance here: https://developer.okta.com](https://developer.okta.com)

# Configuring Your Instance

## Add Some Users

<img src="{{root-url "/assets/docs/images/users.jpg"}}"/>

## Create Your Application

### General Settings

Most of your configuration information lives in this tab.

* `url` is found in the top-right section of your navbar
* `issuer` is your `url` plus `/oauth2/default`
* `clientId` is at the bottom of this page (blurred out in my photo)
* `redirectUri` should be one of the redirect URI's you've added to the application
configuration.

<img src="{{root-url "/assets/docs/images/application-general.jpg"}}"/>

### Sign On Settings

<img src="{{root-url "/assets/docs/images/application-sign-on.jpg"}}"/>

### Assignments Settings

<img src="{{root-url "/assets/docs/images/application-assignments.jpg"}}"/>

### Enabling The Groups Claim

For authorization purposes, your client and server may want the
user's group assignments.  To ensure that groups are included in
your payloads you must configure it in Okta's administrator web console:

1. Sign into your Okta Dashboard
1. Choose the `API > Authorization Servers` menu option
1. Choose the authorization server you wish to configure; in our
simple developer case it is named `default`
1. Choose the `Claims` tab
1. Press the `Add Claim` button to configure a new _groups_
claim for the access token:
<img src="{{root-url "/assets/docs/images/api-authorization-server-claims-access-token-groups.jpg"}}"/>
1. Press the `Add Claim` button again to configure the _groups_ claim on the id token:
<img src="{{root-url "/assets/docs/images/api-authorization-server-claims-id-token-groups.jpg"}}"/>

### CORS Configuration

This demo is deployed and delivered through GitHub pages.  Cool right?!  As such, we
must configure Okta's trusted origins to respect our GitHub pages demo site:
`https://cybertooth-io.github.io/`

From the Okta administration console:

1. Sign into your Okta Dashboard
1. Choose the `API > Trust Origins` menu option
1. Press the `Add Origin` button to configure the new origin

<img src="{{root-url "/assets/docs/images/api-trusted-origins.jpg"}}"/>
