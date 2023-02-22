---
slug: react
title: React
description: This guide explains how to add login, logout and display user profile quickly in React.
authors: [asaf]
tags: [react, spa]
---

# Add user management to your React app

explain what is user management and what we're going to do in this page.

{% partial file="crossid_configure_app.md" variables={redirect_uri: "http://localhost:3000", post_logout_redirect_uri:"http://localhost:3000", allowed_cors_origins: "http://localhost:3000*}"}  /%}

## Install the @crossid/react-client

The `@crossid/react-client` package is a collection of React hooks and components, to install:

```bash
npm install @crossid/react-client
```

## Add AuthProvider{% component="code" data="index.js" %}

The auth provider section

This section will explain:

- Explain what auth provider is.
- why we wrap the app with it.
- What parameters are given.

## Add Login to your app{% component="code" data="login.js" %}

The login section

This section will explain:

- What is the login hook
- How it works
- Explains the example on the right side...

## Add Logout to your app{% component="code" data="logout.js" %}

The logout section

Explain how to add logout...

- What is the logout hook
- How it works
- Explains the example on the right side...

## Display user profile{% component="code" data="profile.js" %}

This section will explain:

- What is an ID token
- What information it contains
- How it's used...

...

...

...

...

...

...

...
