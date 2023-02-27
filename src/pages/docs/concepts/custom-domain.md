---
id: custom-domain
title: Custom Domain
slug: /concepts/custom-domain
description: What is a custom domain
---

A domain translates names into IP addresses, which browsers use to load internet pages. (e.g., "https://crossid.io")

By default login and registration boxes are hosted under the `crossid.io` domain.

Adding a custom domain let you serve the boxes under your own domain.

So instead of a URL such `https://acme.us.crossid.io/auth/login` user will be redirected to `https://acme.io/auth/login`

This has several advantages:

- Branding, your users don't leave your own domain.
- Easy migration between identity services.
- Security and cookie data sharing.

{% callout type="info" title="How to" %}
For instructions, see [Custom Domains How-To](/docs/guides/howto/custom-domain)
{% /callout %}
