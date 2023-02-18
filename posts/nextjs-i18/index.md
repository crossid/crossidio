---
slug: nextjs-i18n
title: nextjs I18n, zero deps
description: How to add internationalization (i18n) and localization (l10n) for Nextjs with zero deps.
authors: [asaf]
tags: [nextjs, react, jamstack]
date: 2021-02-06T13:00:00.000Z
---

NextJS already ships with [built in support for i18n](https://nextjs.org/docs/advanced-features/i18n-routing).

But extra bits are required to perform the actual translation.

While it's possible to use dependencies such as `react-intl`, this post shows a much simpler and cleaner approach
that scales right, no dependencies required!

## Configuring I18N locales in next.config.js

First, lets add support for _english_ and _japanese_ locales, here is our `next.config.js`:

```json
module.exports = {
  "i18n": {
    "locales": ["en", "ja"],
    "defaultLocale": "en",
  },
};
```

next.js generates pages for default, _en_ and _ja_ URLs paths:

- default to english: _http://localhost:3000_
- english locale: _http://localhost:3000/en_
- japanese locale: http://localhost:3000/ja
- any other locales which are not specified in _locales_ would cause 404 (e.g.,: http://localhost:3000/he)

## Where to store messages translations

We could store the messages in a single file in the form of _page_._key_

```js
{
    en: {
        index.welcome: 'Welcome to'
    },
    ja: {
        index.welcome: 'ようこそ'
    }
}
```

The other alternative is to store messages on each component file.

I personally prefer the _per component_ approach as it scales right, no need to maintain prefixes to avoid collisions and every piece of code related to a component stays within the same file, same as where we store PropTypes.

To perform the actual translation, we have to:

1. `useRouter()` hook to determine the current locale.
1. use that locale to find a message in locale's messages.
1. do the translation, preferably support placeholders in messages.

## The i18n hook

Lets write a hook to make the actual translation even simpler:

```js
import { useCallback } from 'react'
import { useRouter } from 'next/router'

// format("hello {0}", "world") returns "hello world"
const format = (msg, ...args) => {
  for (let k in args) {
    msg = msg.replace('{' + k + '}', args[k])
  }
  return msg
}

// useI18n is a react hook that returns t func, which translates a message according to current locale.
export function useI18n(msgs) {
  const router = useRouter()
  const { locale } = router

  const t = useCallback(
    (id, ...args) => {
      const lmsgs = msgs[locale]
      const msg = lmsgs[id] || msgs.en[id] || id

      return format(msg, ...args)
    },
    [locale]
  )

  return {
    t,
    locale,
  }
}

export default useI18n
```

Here's example how to use the hook:

```js
export default function Home() {
  const { t } = useI18n(msgs)
  return (
    <main>
      <h1 className={styles.title}>{t('welcome_to', 'next.js')}</h1>
    </main>
  )
}

const msgs = {
  en: {
    welcome_to: 'Welcome to {0}',
  },
  ja: {
    welcome_to: 'ようこそ {0}',
  },
}
```

1. We pass msgs into the _useI18n_ hook.
1. The hook determine the current locale using `useRouter()`
1. The hook uses the corresponding locale key within the msgs object.
1. The hook translate the message with support for placeholders.

Try to hit `http://localhost:3000/en` or `http://localhost:3000/je` to see the translation in english and japanese, respectively.

Code sample available in [https://github.com/asaf/nextjs-i18n-example](https://github.com/asaf/nextjs-i18n-example)
