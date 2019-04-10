# Okta

This section is for people who need some help getting Okta configured.

## Need A Development Instance?

Yes!  You should try to authenticate with a development instance before you do
it live like Bill O'Reilly.

[Create your development Okta instance here: https://developer.okta.com](https://developer.okta.com)

# Configuring Your Instance

## Add Some Users

<img alt="Okta User Management" src="{{root-url "/assets/docs/images/users.jpg"}}"/>

## Create Your Application

### General Settings

Most of your configuration information lives in this tab.

* `url` is found in the top-right section of your navbar
* `issuer` is your `url` plus `/oauth2/default`
* `clientId` is at the bottom of this page (blurred out in my photo)
* `redirectUri` should be one of the redirect URI's you've added to the application
configuration.

<img alt="Application General Settings" src="{{root-url "/assets/docs/images/application-general.jpg"}}"/>

### Sign On Settings

<img alt="Application Sign On Settings" src="{{root-url "/assets/docs/images/application-sign-on.jpg"}}"/>

### Assignments Settings

<img alt="Application Assignments Settings" src="{{root-url "/assets/docs/images/application-assignments.jpg"}}"/>

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
<img alt="Groups Claim Settings" src="{{root-url "/assets/docs/images/api-authorization-server-claims-access-token-groups.jpg"}}"/>
1. Press the `Add Claim` button again to configure the _groups_ claim on the id token:
<img alt="Groups Claim Settings" src="{{root-url "/assets/docs/images/api-authorization-server-claims-id-token-groups.jpg"}}"/>
