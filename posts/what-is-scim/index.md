---
slug: what-is-scim
title: What is SCIM
description: An introduction to the System for Cross-domain Identity Management.
card: scim-card.png
authors: [asaf]
tags: ['SCIM', 'provisioning', 'cloud']
date: 2018-05-14T15:01:02.000Z
---

Over the last decade, the world has beeing moving to the cloud, with legacy and on-premise applications side by side.

Such hybrid architecture arises many technological complexities. One of the challenges is about how to securely exchange and provision identities between the different parties.

SCIM standardizes how identity resources such _Users_ and _Groups_ look like and how to exchange them between the different applications.

By simplyfing the whole identity provisioning process, it reduce total integration costs and increase security.

Quote from RFC:

    The SCIM specification is designed to manage user identity in
    cloud-based applications and services in a standardized way to
    enable interoperability, security, and scalability.

## Why SCIM?

Without SCIM, each application would have its own identities representation and protocol.

Special connectors would be required per application to exchange identities.

The lack of a standard requires a lot of effort in order to integrate and exchange identities between each two parties.

It is a very costly process and may lead to mistaks and complexities which impact the overall security.

## How SCIM works?

SCIM is divided into two parts: [the schema](https://tools.ietf.org/html/rfc7643) that defines how resources such as _users_ and _groups_ look like and [the protocol](https://tools.ietf.org/html/rfc7644) that defines how those resources should be exchanged (_added_, _removed_, _updated_ and so on).

SCIM is built for the cloud and is based on standard cloud tech such as REST API & JSON.

In SCIM, there are two parties: Clients and Service Providers.

A service provider (SP) is an application such as _Slack_ or _corporate app_ that requires to store identities and access. A client is the party that interacts with the SP in order to read and manage its identities automatically. a good example of a client is CrossID as it can interact with SCIM applications seamlessly.

## CrossID and SCIM

CrossID can intreact with any SCIM application with very minimal integration effort.

When changes are made in HR to employees, CrossID can sync those changes to SCIM apps according to corporate policies.

For example, if a sales manager joins the company it can create a user in CRM automatically and grant the relevant access according to the sales region.

When employee leaves the company it will automatically de-provision any users and access the employee has.

CrossID can also read all identities and privileges from SCIM apps and save those details in its own store.
This is handful in order to consolidate identities, detect vulnerabilities and exccessive access and notify or take actions when such incidents occur.

It even takes SCIM further by exposing SCIM protocol to the outside world and act as an intermediate between other IDPs and corproate applications.

{% img alt="CrossID-SCIM" name="crossid-scim.png" width=800 height=800 /%}

## Conclusions

SCIM make it easier, faster and cheaper to exchange identities across applications.

When used in conjunction with SSO standards such as Oauth2/OIDC or SAML, SCIM provides IT an end-to-end standard solution for identity and access management.
