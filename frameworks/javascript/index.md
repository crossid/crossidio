---
slug: js
title: Javascript
description: This guide explains how to add login, logout and display user profile in vanilla JavaScript.
authors: [asaf]
tags: [js, javascript, spa]
date: 2023-03-03T15:01:02.000Z
---

Using JavaScript directly allows for greater flexibility and control over the code as there are no abstractions or limitations imposed by a specific framework.

By following this guide, you will learn how to add user management into your apps using the [@crossid/crossid-spa-js](https://github.com/crossid/crossid-spa-js) SDK directly without any wrappers.

{% callout type="info" %}
If you don't use plain JavaScript, follow other framework guides such as [React](/docs/frameworks/react) or [Vue](/docs/frameworks/vue).
{% /callout %}

{% partial file="crossid_configure_app.md" variables={login_redirect_uri: "http://localhost:3000", logout_redirect_uri:"http://localhost:3000", allowed_cors_origins: "http://localhost:3000*"}  /%}

## Install the @crossid/crossid-spa-js{% component="code" data="index.html" section="import_client" %}

The `@crossid/crossid-spa-js` package provides the facility to implement a user management in JavaScript applications.

You can install the package via _npm_ `npm install @crossid/crossid-spa-js` or refer directly via a CDN.

For simplicity, we include the package directly from CDN.

## Create the Client{% component="code" data="index.html" section="create_client"%}

First lets create the {% sdkApiLink to="classes/Client.html" %}Client{% /sdkApiLink %} object that provides the functionality needed to perform all user actions such login, logout and show user profile.

The client requires some configuration options such your app's _client id_ and the _redirect uri_ to return upon a successful login or logout.

{% callout type="info" %}
If you have configured an app the code in previous step then the code snippet is already configured for your app.
{% /callout %}

## Signup{% component="code" data="index.html" section="signup" %}

Invoke the {% sdkApiLink to="classes/Client.html#signupWithRedirect" %}client.signupWithRedirect(){% /sdkApiLink %} method to start the signup process.

This method redirects the user to Crossid and starts a signup flow.

After finishing the signup process, the user will be logged in and directed back to the website.

## Login{% component="code" data="index.html" section="login" %}

Invoke the {% sdkApiLink to="classes/Client.html#loginWithRedirect" %}client.loginWithRedirect(){% /sdkApiLink %} method to start the login process.

This method redirects the user to Crossid and starts a login flow,

Once the login process completes, the user will be redirected back to your website,

See next step how to complete the login process.

## Handle login callback from Crossid{% component="code" data="index.html" section="login_callback" %}

Upon a successful login, Crossid redirects the user back to your website with a `code` _query param_.

This `code` needs to be exchanged with a token that then can be used by your app to authenticate your services such as _REST API_

Invoke the {% sdkApiLink to="classes/Client.html#handleRedirectCallback" %}client.handleRedirectCallback(){% /sdkApiLink %} method to exchange the `code` with a `token`.

For more information about tokens see [OIDC tokens](/docs/concepts/oidc_tokens)

## Add logout{% component="code" data="index.html" section="logout" %}

Invoke the {% sdkApiLink to="classes/Client.html#logoutWithRedirect" %}client.logoutWithRedirect(){% /sdkApiLink %} method to start the logout process.

This method redirects the user to Crossid and starts a logout flow,

Once the logout process completes, the user will be redirected back to your website,

See next step how to complete the logout process.

## Handle logout callback from Crossid{% component="code" data="index.html" section="logout_callback" %}

Upon a successful logout, Crossid redirects the user back to your website with a `state` _query param_.

Invoke the {% sdkApiLink to="classes/Client.html#handleLogoutRedirectCallback" %}client.handleLogoutRedirectCallback(){% /sdkApiLink %} method to complete the logout process.

This will delete user tokens from user's storage (e.g., _local storage_).

## Show user profile{% component="code" data="index.html" section="show_user_profile" %}

When user is authenticated, it is common to display details such _email_ or _name_.

Call the {% sdkApiLink to="classes/Client.html#getUser" %}client.getUser(){% /sdkApiLink %} to get the user details.

{% partial file="framework_recap.md" variables={fw_meta: $fw_meta} /%}

{% partial file="framework_next.md" variables={fw_meta: $fw_meta} /%}
