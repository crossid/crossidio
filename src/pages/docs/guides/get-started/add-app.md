---
id: add_app
title: Add an App
sidebar_label: Add an App
slug: /guides/get-started/add-app
description: Adding an App
---

## What is an app?

An _app_ represents your application where users logs in.

For simplicity, let's create a server-side web app.

{% callout type="info" title="Other apps" %}
Crossid supports various app types such as _single page applications (SPA)_, _mobile_ and _APIs_. for more info see [application](/docs/concepts/application).
{% /callout %}

## Start from a sample

To speed things up, let's start from a sample with a framework of your choice.

| Framework       | Repository                                                                             |
| --------------- | -------------------------------------------------------------------------------------- |
| Node.js Express | [see walk through](/docs/langs/backend/nodejs-express)                                 |
| Golang          | [https://github.com/crossid/samples-golang](https://github.com/crossid/samples-golang) |

Each sample has a _README.md_ file with instructions how to set up the sample.

{% callout type="info" title="Advanced" %}
For more in-depth guides per language, check [languages](/docs/languages).
{% /callout %}

## Tell Crossid about your app

Once the app is running we should tell Crossid about it.

Crossid will give you back _client id_ and _client secret_ needed for our app.

## Update your app

Every time a user tries to login, the app should redirect to Crossid and provide the _client id_.

Follow the _README.md_ of the sample project how to set the _client_id_ and optionally the _client_secret_ in your app.
