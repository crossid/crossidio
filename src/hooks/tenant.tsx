import { createContext, useCallback, useEffect, useState } from 'react'
import { useAuth } from '@crossid/crossid-react'
import { Env, IApp, ITenant, Region } from '@/types'
import { crossidPublicDomain } from '@/utils/location'

type provisioningStatus = 'completed' | 'fatal' | 'started'

export interface Tenant {
  id: string
  displayName: string
  provisioningStatus: provisioningStatus
  provisionError: string
  deactivatedAt?: string
  terminateAt?: string
  clusterId: string
  regionCode: Region
  environmentTag: Env
  domains: string[]
}

interface tenantCreationPayload {
  displayName: string
  tenantId: string
  type: string
  regionCode: Region
  environmentTag?: Env
}

export default function useTenant(): {
  list?: Tenant[]
  listError?: Error
  listLoading: boolean
  create: Function
  creating: boolean
  get: Function
} {
  const { getAccessToken } = useAuth()

  const [list, setList] = useState<Tenant[] | undefined>()
  const [listError, setListError] = useState<Error>()
  const [listLoading, setListLoading] = useState(false)

  useEffect(() => {
    async function fetchList() {
      setListLoading(true)
      try {
        const act = await getAccessToken({ scope: 'email openid' })
        if (!!act) {
          const resp = await fetch(`/api/v1/tenants`, {
            headers: {
              authorization: `Bearer ${act}`,
            },
          })
          const respJson = await resp.json()

          respJson.Resources.forEach(
            (t: Tenant) =>
              (t.domains = [`${t.id}.${t.regionCode.toLowerCase()}.${crossidPublicDomain()}`])
          )
          setList(respJson.Resources)
        }
      } catch (err: any) {
        setListError(err)
      } finally {
        setListLoading(false)
      }
    }

    if (!list && !!getAccessToken) {
      fetchList()
    }
  }, [getAccessToken, list])

  const [creating, setCreating] = useState(false)
  const create = useCallback(
    async (payload: tenantCreationPayload) => {
      setCreating(true)
      try {
        const act = await getAccessToken({ scope: 'create:tenant', audience: ['management'] })
        if (!act) {
          throw { message: 'failed to get access token' }
        }
        const resp = await fetch(`/api/v1/tenants`, {
          headers: {
            authorization: `Bearer ${act}`,
          },
          method: 'POST',
          body: JSON.stringify(payload),
        })
        const ok = resp.ok
        const respJson = await resp.json()
        if (!ok) {
          throw respJson
        }

        return respJson as ITenant
      } catch (e: any) {
        throw e
      } finally {
        setCreating(false)
      }
    },
    [getAccessToken]
  )

  const [loadingTenant, setLoadingTenant] = useState(false)
  const get = useCallback(
    async (id: string) => {
      setLoadingTenant(true)
      try {
        const act = await getAccessToken({ audience: ['management'], scope: 'openid email' })
        if (!act) {
          throw 'failed to get access token'
        }
        const resp = await fetch(`/api/v1/tenants/${id}`, {
          headers: {
            authorization: `Bearer ${act}`,
          },
        })
        const ok = resp.ok
        const respJson = await resp.json()
        if (!ok) {
          throw respJson
        }

        return respJson
      } finally {
        setLoadingTenant(false)
      }
    },
    [getAccessToken]
  )

  return { list, listError, listLoading, create, creating, get }
}

type TenantContextProps = {
  tenant?: Tenant | null
  app?: IApp
  setTenant: Function
  setApp: (app?: IApp) => void
  getAccessToken: (scopes?: string) => Promise<string>
}

export function prepareAudience(tenant?: Tenant | null): string[] {
  if (!tenant) {
    return ['management']
  }

  const audience = [
    tenant.id,
    'management',
    `https://${
      tenant.id
    }.${tenant.regionCode.toLocaleLowerCase()}.${crossidPublicDomain()}/oauth2/token`,
  ]

  return audience
}

export const TenantContext = createContext<TenantContextProps>({
  setTenant: () => {},
  setApp: () => {},
  getAccessToken: () => {
    return Promise.resolve('')
  },
})

const TENANT_LOCALSTORAGE_KEY = '__tenant__'
export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<Tenant | undefined | null>()
  const { loginWithRedirect, getAccessToken } = useAuth()

  useEffect(() => {
    const currentTenantStr = localStorage.getItem(TENANT_LOCALSTORAGE_KEY)
    if (!!currentTenantStr) {
      setTenant(JSON.parse(currentTenantStr))
    }
  }, [])

  async function _setTenant(t: Tenant | undefined) {
    setTenant(t)
    if (!t) {
      localStorage.removeItem(TENANT_LOCALSTORAGE_KEY)
      return
    } else {
      localStorage.setItem(TENANT_LOCALSTORAGE_KEY, JSON.stringify(t))
    }

    const audience = prepareAudience(t)
    const ac = await getAccessToken({ audience })
    if (!ac) {
      loginWithRedirect({
        audience,
        state: {
          return_to: window.location.pathname,
        },
      })
    }
  }

  async function _getAccessToken(scope?: string) {
    const audience = prepareAudience(tenant)
    return getAccessToken({ audience, scope })
  }

  const [app, setApp] = useState<IApp | undefined>()

  return (
    <TenantContext.Provider
      value={{
        tenant,
        setTenant: _setTenant,
        setApp,
        app,
        getAccessToken: _getAccessToken,
      }}
    >
      {children}
    </TenantContext.Provider>
  )
}
