export type Integration = {
  id: string
  displayName: string
  description: string
  version: string
  keywords: string[]
  logoURL?: string
  links: {
    name: string
    url: string
  }[]
  poweredBy?: string
  active: boolean
  meta: {
    created: string
    lastModified: string
  }
}

export type App = {
  id: string
  displayName: string
  appId: string
  active: boolean
}

export type ClientLink = {
  id: string
  externalId: string
  meta: {
    appId: string
  }
}

export type Client = {
  id: string
  client_id: string
  client_name: string
  redirect_uris: string[]
  post_logout_redirect_uris: string[]
  allowed_cors_origins: string[]
  logo_uri: string
  meta: {
    revision: number
  }
}
