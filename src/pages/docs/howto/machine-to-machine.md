---
id: machine-to-machine
title: Machine to Machine
sidebar_label: Custom DOmain
slug: /howto/machine-to-machine
description: How to programmatically authenticate a machine from another machine.
---

A service (aka: _machine_) is a non human program that may request an access token from _Crossid_ in order to authenticate to other services.

A good example is a micro service or a scheduled job that requires access to a protected REST API.

This how-to explains how to perform authentication programmatically, with no user interaction, so a service could access some API.

## Create a service account

A service account is a user intended to be used for services rather people.

Lets create a service account that will be granted with privileges to access our API.

{% tabs %}

{% tab label="Console" %}

1. In _Admin_ console, navigate to **Directory &rarr; Service Accounts**.
1. Open the Actions dropdown and click **Add**.
1. Follow the modal (don't forget to make the account active).

![add service account](/images/docs/howto/add_svc_account.gif)

{% /tab %}

{% tab label="Curl" %}

```bash {10-11,18-22}
curl -X POST \
-H "Authorization: Bearer <API_TOKEN>" \
-d '
{
  "userName": "periodicCleanup",
  "displayName": "Periodic Cleanup Account",
  "active": true
}
' https://{tenant}.us.crossid.io/api/v1/resources/cid/ServiceAccount?reason=add-user
```

{% /tab %}

{% /tabs %}

## Machine to Machine

This machine to machine integration will make our service account be able to authenticate via OAuth2.

1. In _Admin_ console, navigate to **Marketplace &rarr; Machine to Machine**.
1. Click the **Add Integration** button.
1. Follow the wizard.

![add machine to machine integration](/images/docs/howto/add_machine_to_machine_integration.gif)

{% callout type="info" title="Required for next step, copy from Admin UI the fields below" %}

{% inlineField name="client_id" text="Your Client ID" %}
{% /inlineField %}

{% inlineField name="client_secret" text="Your Client Secret" type="password" %}
{% /inlineField %}

{% /callout %}

## Create an API integration

Lets create an API that our service should access.

1. In _Admin_ console, navigate to **Marketplace &rarr; API**.
1. Click the **Add Integration** button.
1. Follow the wizard.

![how-to](/images/docs/howto/add_api_integration.gif)

## Grant Access

We have to grant our service account access to the API.

### Authenticate

At this point, we have a service account that have _write_ grants to access our API app, lets authenticate.

```bash {% resolve=true %}
curl -X POST https://<tenant_domain>/oauth2/token \
  -F grant_type=client_credentials \
  -F client_id=<client_id> \
  -F client_secret=<client_secret> \
  -F scope='write'
```

Output:

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsImt...",
  "expires_in": 3599,
  "refresh_expires_in": 2592000000000000,
  "scope": "write",
  "token_type": "bearer"
}
```
