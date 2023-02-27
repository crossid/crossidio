---
id: custom-domain
title: Custom Domain
sidebar_label: Custom DOmain
slug: /howto/custom-domain
description: How to configure a custom domain
---

A [Custom Domain](/docs/concepts/custom-domain) let you serve login under your own domain.

This page explains how to add a custom domain.

## Add the domain

1. In Admin console, navigate to **Branding &rarr; Domains**.
1. Click on **Add Integration**.
1. In the DNS record, put your chosen custom domain.
   For example: _auth.acme.io_
1. Click the **Add** button.

## Domain validation

For security reasons, we have to ensure that you own the domain,
This requires you to add a TXT record with the given details in your domain entries.

![dns record](/images/docs/howto/customdomain_dns_record.png)

(See below if your DNS provider is GoDaddy)

After adding the DNS record, click the **Verify Domain** button.

The domain should be in a _verified_ state.

![verified](/images/docs/howto/customdomain_verified.png)

## Certificate deployment

For SSL to work, a certificate (with its key) should be provided,

Issuing a certificate is beyond the scope of this tutorial.

Once a certificate issued, you should have a PEM file with a full chain certificate and a key.

In the domains action, click the **deploy** button (see screenshot above).

Provide the certificate and key and click deploy.

If everything is okay, the deployment state should be green.

Wait a bit for the deployment process to end.

## Use the domain

Refer to your domain instead of _crossid.io_, for example, if your tenant is _acme_, located in US then

OAuth endpoints would be referred to: **https://acme.us.crossid.io/oauth2/.well-known/openid-configuration**

If your custom domain is `auth.acme.io`, your can refer now to the URL: `https://auth.acme.io/oauth2/.well-known/openid-configuration` instead.

## DNS Providers

### GoDaddy

If your domain is hosted in GoDaddy follow these steps:

1. Open https://dcc.godaddy.com/manage/acme.io/dns
1. Put a _TXT_ record with the given _name_ and _value_.
1. Click the **Add Record**.

![godaddy](/images/docs/howto/customdomain_godaddy.png)
