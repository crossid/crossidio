## Configure Crossid{% component="configure-app" %}

To use Crossid you have to setup an [application](/docs/concepts/application) via this page.

An application defines how authentication works for your project.

### Configure Application

Use the right pane to create or select an application,

Every application in Crossid is assigned with a unique _Client ID_ that should be defined in your code.

{% callout type="tip" %}
For advanced application settings, use the [dashboard](management)
{% /callout %}

### Configure Login redirect URL

A _login url_ is where Crossid will redirect users after they log in.

{% callout type="info" %}

Code samples in this guide expects **{% $login_redirect_uri %}**

{% /callout %}

### Configure Logout redirect URL

A _logout url_ is where Crossid will redirect users after they log out.

{% callout type="info" %}

Code samples in this guide expects **{% $logout_redirect_uri %}**

{% /callout %}

{% if $allowed_cors_origins %}

### Configure Web Origins (CORS)

_Web origins_ is a URL that allows your SPA to interact with Crossid APIs.

{% callout type="info" %}

Code samples in this guide expects **{% $allowed_cors_origins %}**

{% /callout %}

{% /if %}
