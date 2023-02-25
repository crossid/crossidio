import { createContext, useEffect, useState } from 'react'
import { useAuth } from '@crossid/crossid-react'
import { IApp } from '@/components/ConfigureApp'

type provisioningStatus = 'completed' | 'fatal' | 'started'
export type TenantRegion = 'US' | 'EU' | 'JP' | 'AU' | 'local'
export type TenantEnv = 'development' | 'staging' | 'production'

export interface Tenant {
  id: string
  displayName: string
  provisioningStatus: provisioningStatus
  provisionError: string
  deactivatedAt?: string
  terminateAt?: string
  clusterId: string
  regionCode: TenantRegion
  environmentTag: TenantEnv
  domains: string[]
}

export default function useTenant(): {
  list?: Tenant[]
  listError?: Error
  listLoading: boolean
} {
  const { getAccessToken } = useAuth()

  const [list, setList] = useState<Tenant[] | undefined>()
  const [listError, setListError] = useState<Error>()
  const [listLoading, setListLoading] = useState(false)

  useEffect(() => {
    async function fetchList() {
      setListLoading(true)
      try {
        const act = await getAccessToken()
        if (!!act) {
          const resp = await fetch(`/api/v1/tenants`, {
            headers: {
              authorization: `Bearer ${act}`,
            },
          })
          const respJson = await resp.json()

          // TODO: remove this after resolving ticket https://github.com/crossid/backend/issues/562
          respJson.Resources.forEach(
            (t: Tenant) =>
              (t.domains = [`${t.id}.${t.regionCode.toLowerCase()}.crossid.io`])
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

  return { list, listError, listLoading }
}

type TenantContextProps = {
  tenant?: Tenant
  app?: IApp
  setTenant: Function
  setApp: (app?: IApp) => void
}

export const TenantContext = createContext<TenantContextProps>({
  setTenant: () => {},
  setApp: () => {},
})

const TENANT_LOCALSTORAGE_KEY = '__tenant__'
export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<Tenant | undefined>()

  useEffect(() => {
    const currentTenantStr = localStorage.getItem(TENANT_LOCALSTORAGE_KEY)
    if (!!currentTenantStr) {
      setTenant(JSON.parse(currentTenantStr))
    }
  }, [])

  function _setTenant(tenant: Tenant | undefined) {
    localStorage.setItem(TENANT_LOCALSTORAGE_KEY, JSON.stringify(tenant))
    setTenant(tenant)
  }

  const [app, setApp] = useState<IApp | undefined>()

  return (
    <TenantContext.Provider
      value={{ tenant, setTenant: _setTenant, setApp, app }}
    >
      {children}
    </TenantContext.Provider>
  )
}
