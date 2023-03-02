import { useCallback, useContext, useEffect, useState } from 'react'
import { useAuth } from '@crossid/crossid-react'
import { Tenant, TenantContext } from './tenant'
import { Patch } from '@/data/patch'
import { App, Client, ClientLink } from '@/data/applications'

type AppReturn = {
  app: App
  client: Client
}

export function useApps() {
  const [data, setData] = useState<Record<string, AppReturn> | undefined>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(undefined)

  const { tenant, getAccessToken } = useContext(TenantContext)

  const getClientLinks = useCallback(async function (
    tenant: Tenant,
    appIds: string[],
    act: string
  ): Promise<ClientLink[]> {
    const idsStr = `${appIds.join('","')}`

    const url = `/${tenant.id}/api/v1/resources/_/ClientLinks?count=0&filter=meta.appId in ["${idsStr}"]&attributes=meta,externalId`

    const resp = await fetch(url, {
      headers: {
        authorization: `Bearer ${act}`,
      },
    })

    if (resp.status > 299) {
      throw await resp.json()
    }

    const { Resources } = await resp.json()
    return Resources
  },
  [])

  const getClients = useCallback(async function (
    tenant: Tenant,
    clientIds: string[],
    act: string
  ): Promise<Client[]> {
    const idsStr = `${clientIds.join('","')}`
    const url = `/${tenant.id}/api/v1/oauth2/clients?filter=client_id in ["${idsStr}"]&count=0`

    const resp = await fetch(url, {
      headers: {
        authorization: `Bearer ${act}`,
      },
    })

    if (resp.status > 299) {
      throw await resp.json()
    }

    const { Resources } = await resp.json()
    return Resources
  },
  [])

  const listApps = useCallback(
    async function () {
      if (!tenant) {
        return
      }

      try {
        setLoading(true)
        const act = await getAccessToken()
        if (!act) {
          return
        }
        const url = `/${tenant.id}/api/v1/apps?count=0&filter=appId ne "iam"`
        const resp = await fetch(`${url}`, {
          headers: {
            authorization: `Bearer ${act}`,
          },
        })

        if (resp.status > 299) {
          throw await resp.json()
        }

        const { Resources: appsList } = await resp.json()
        const clientLinkIds: string[] = []
        appsList.forEach((app: App) => {
          clientLinkIds.push(app.appId)
        })

        const clientIds: string[] = []
        const clientLinks: Record<string, ClientLink> = {}
        const clientLinksResp = await getClientLinks(tenant, clientLinkIds, act)

        clientLinksResp.forEach((clr) => {
          if (!!clr) {
            clientIds.push(clr.externalId)
            clientLinks[clr.meta.appId] = clr
          }
        })

        const iApps: Record<string, AppReturn> = {}
        const clients = await getClients(tenant, clientIds, act)
        const clientMap: Record<string, Client> = {}
        clients.forEach((c) => {
          clientMap[c.client_id] = c
        })

        appsList.forEach((app: App) => {
          const clientLink = clientLinks[app.appId]
          if (!clientLink) {
            return
          }
          const client = clientMap[clientLink.externalId]
          iApps[client.id] = {
            app,
            client,
          }
        })

        setData(iApps)
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [getAccessToken, getClientLinks, getClients, tenant]
  )

  if (!data && !loading && !error) {
    listApps()
  }

  useEffect(() => {
    setData(undefined)
    setError(undefined)
  }, [tenant])

  const updateClient = useCallback(
    async ({ clientId, patch }: { clientId: string; patch: Patch }) => {
      if (!tenant || !patch.Operations.length) {
        return
      }
      const url = `/${tenant.id}/api/v1/oauth2/clients/${clientId}?reason=updated from crossid site`
      const act = await getAccessToken()
      if (!act) {
        return
      }

      try {
        const resp = await fetch(url, {
          method: 'PATCH',
          headers: {
            authorization: `Bearer ${act}`,
          },
          body: JSON.stringify(patch),
        })

        const updatedClient = await resp.json()
        if (resp.status > 299) {
          throw updatedClient
        }

        const app = data?.[updatedClient.id]
        if (!!app) {
          app.client = updatedClient
        }

        return updatedClient
      } catch (e: any) {
        throw e
      }
    },
    [data, getAccessToken, tenant]
  )

  return {
    apps: data,
    appsLoading: loading,
    appsError: error,
    updateClient,
  }
}
