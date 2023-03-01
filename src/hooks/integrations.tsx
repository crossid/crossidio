import { Integration } from '@/data/applications'
import { useAuth } from '@crossid/crossid-react'
import { useCallback, useContext, useEffect, useState } from 'react'
import { prepareAudience, TenantContext } from './tenant'

export function useIntegrations(
  filter: string = 'id in ["singlePageApp", "webApp"]'
) {
  const [data, setData] = useState<Integration[] | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(undefined)

  const { tenant, getAccessToken } = useContext(TenantContext)

  const listIntegrations = useCallback(
    async function (filter: string) {
      if (!tenant) {
        return
      }

      try {
        setLoading(true)
        const act = await getAccessToken()
        if (!act) {
          return
        }
        const url = `/${tenant.id}/api/v1/integrations?count=0&filter=${filter}`
        const resp = await fetch(`${url}`, {
          headers: {
            authorization: `Bearer ${act}`,
          },
        })

        if (resp.status > 299) {
          throw await resp.json()
        }

        const { Resources: integrationsList } = await resp.json()

        setData(integrationsList)
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [getAccessToken, tenant]
  )

  if (!data && !loading && !error) {
    listIntegrations(filter)
  }

  useEffect(() => {
    setData(undefined)
    setError(undefined)
  }, [tenant])

  const create = useCallback(
    async (data: creationData) => {
      if (!tenant) {
        return
      }
      try {
        const act = await getAccessToken()
        if (!act) {
          return
        }
        const resp = await fetch(
          `/${tenant.id}/api/v1/integrations/.provision?reason=UI+Integration+from+website`,
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${act}`,
            },
            method: 'POST',
            body: JSON.stringify({
              type: data.integrationId,
              data: prepareData(data),
            }),
          }
        )
        return resp.json()
      } catch (e: any) {
        throw e
      }
    },
    [getAccessToken, tenant]
  )

  return {
    integrations: data,
    integrationsLoading: loading,
    integrationsError: error,
    create,
  }
}

interface creationData {
  integrationId: string
  appId: string
  appName: string
  loginUris: string[]
  logoutUris?: string[]
  corsOrigins: string[]
  scopes: string[]
  audiences: string[]
}

function prepareData(data: creationData): Record<string, any>[] {
  const preparedData: Record<string, any>[] = []

  preparedData.push({
    // type: 'appManifest',
    collectorId: 'appDetails',
    vars: {
      appId: data.appId,
      displayName: data.appName,
    },
  })

  preparedData.push({
    collectorId: 'appConfig',
    vars: {
      scopes: data.scopes,
      audiences: data.audiences,
    },
  })

  preparedData.push({
    collectorId: 'oauth2Client',
    vars: {
      redirect_uris: data.loginUris,
      post_logout_redirect_uris: data.logoutUris,
      allowed_cors_origins: data.corsOrigins,
    },
  })

  return preparedData
}
