---
id: add_person
title: Add a Person
sidebar_label: Add a Person
slug: /guides/get-started/add-person
description: Adding a new Person
---

A person is a digital representation of a human that access your apps. this can be a customer for public web sites or an employee for a private app.

With Crossid you don't need to maintain your own user management. Creating new user profile, granting permissions, unlock or resetting credentials can all be done via the admin console.

Lets add a new person:

{% tabs %}

{% tab label="Console" %}

1. From the admin console, navigate to **Directory** -> **People**.
1. Click the **Add Person** button.
1. Fill up the form and click **Save**.

{% /tab %}

{% tab label="Curl" %}

```curl {3,6-9}
curl -X POST -d '
{
  "displayName": "Hooli Corp",
  "tenantId": "hooli",
  "type": "developer",
  "user": {
    "displayName": "Gavin Belson",
    "email": "gavin@hooli.io",
    "password": "initial_pass"
  }
}' https://cid.crossid.io/api/global/v1/tenants/.register
```

{% /tab %}

{% /tabs %}

The person is now created and ready to be used, lets register an application.
