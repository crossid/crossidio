---
id: tenant
title: Tenant
slug: /concepts/tenant
description: What is a tenant
---

A tenant is an isolated private namespace that holds all resources related to identity management, such as [applications](./Application), users, groups, etc.

Your tenant URL would be _<tenant_id>_.crossid.io (e.g., "acme.crossid.io")

Typically each organization have a single tenant.

{% callout type="info" title="For SAAS providers" %}
If you are seeking for a b2b solution (such as SAAS), for secured, high isolation, each customer of yours should have its own tenant
see b2b documentation for more information of such use case.
{% callout /}

If you don't have one, [register one for free](https://www.crossid.io/signup).
