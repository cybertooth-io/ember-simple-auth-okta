# Okta

This section is for people who need some help getting Okta configured.

## Need A Development Instance?

Yes!  You should try to authenticate with a development instance before you do
it live like Bill O'Reilly.

[Create your development Okta instance here: https://developer.okta.com](https://developer.okta.com)

# Configuring Your Instance

## Add Some Users

![Okta User Management](/assets/docs/images/users.jpg)

## Create Your Application

### General Settings

Most of your configuration information lives in this tab.

* `url` is found in the top-right section of your navbar
* `issuer` is your `url` plus `/oauth2/default`
* `clientId` is at the bottom of this page (blurred out in my photo)
* `redirectUri` should be one of the redirect URI's you've added to the application
configuration.

![Application General Settings](/assets/docs/images/application-general.jpg)

### Sign On Settings

![Application Sign On Settings](/assets/docs/images/application-sign-on.jpg)

### Assignments Settings

![Application Assignments Settings](/assets/docs/images/application-assignments.jpg)
