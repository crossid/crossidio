import { ConfigureApp, IAppConfigureData } from '@/components/ConfigureApp'
import { Integration } from '@/data/applications'
import { Patch } from '@/data/patch'
import { useApps } from '@/hooks/apps'
import { useIntegrations } from '@/hooks/integrations'
import { TenantContext } from '@/hooks/tenant'
import { useContext, useMemo, useState } from 'react'

function Demo() {
  const { app, setApp } = useContext(TenantContext)
  const { apps: appTuples, appsError, updateClient } = useApps()
  const { integrations = [], integrationsError, create } = useIntegrations()
  const [integration, setIntegration] = useState<Integration | null>(null)

  const apps = useMemo(() => {
    if (!appTuples) {
      return []
    }
    return Object.values(appTuples || {}).map((at) => {
      const {
        client: {
          id,
          redirect_uris = [],
          post_logout_redirect_uris = [],
          allowed_cors_origins = [],
        },
        app: { displayName, active },
      } = at

      return {
        id,
        displayName: displayName,
        active: active,
        loginUri: redirect_uris[0],
        logoutUri: post_logout_redirect_uris[0],
        corsOrigin: allowed_cors_origins[0],
      }
    })
  }, [appTuples])

  async function onSubmit() {
    const { id } = app!
    const formerClient = appTuples![id]
    const patch: Patch = {
      Operations: [],
      revision: formerClient.client.meta.revision,
    }

    if (app?.corsOrigin !== formerClient.client.allowed_cors_origins[0]) {
      patch.Operations.push({
        path: '/allowed_cors_origins/0',
        op: 'replace',
        value: app?.corsOrigin,
        oldValue: formerClient.client.allowed_cors_origins[0],
      })
    }

    if (app?.loginUri !== formerClient.client.redirect_uris[0]) {
      patch.Operations.push({
        path: '/redirect_uris/0',
        op: 'replace',
        value: app?.loginUri,
        oldValue: formerClient.client.redirect_uris[0],
      })
    }

    const { post_logout_redirect_uris } = formerClient.client
    if (!post_logout_redirect_uris) {
      patch.Operations.push({
        path: 'post_logout_redirect_uris',
        op: 'add',
        value: [app?.logoutUri],
      })
    } else if (!app?.logoutUri) {
      patch.Operations.push({
        path: 'post_logout_redirect_uris',
        op: 'replace',
        value: post_logout_redirect_uris.slice(1),
        oldValue: post_logout_redirect_uris,
      })
    } else if (app?.logoutUri !== post_logout_redirect_uris[0]) {
      patch.Operations.push({
        path: '/post_logout_redirect_uris/0',
        op: 'replace',
        value: app?.logoutUri,
        oldValue: post_logout_redirect_uris[0],
      })
    }

    try {
      await updateClient({ clientId: id, patch })
    } catch (e: any) {
      // what to do on error??
    }
  }

  function onCancel() {
    if (!app) {
      return
    }

    const { id } = app
    const formerApp = apps.find((app) => app.id === id)
    setApp(formerApp)
  }

  async function createApp(
    configurationData: IAppConfigureData,
    onSuccess: Function
  ) {
    if (!integration) {
      return
    }

    const id = (Math.random() + 1).toString(36)
    try {
      const createdApp = await create({
        integrationId: integration.id,
        appId: id.substring(2),
        appName: `demo application ${id.substring(9)}`,
        loginUris: [configurationData.loginUri],
        logoutUris: [configurationData.logoutUri],
        corsOrigins: [configurationData.corsOrigin],
        scopes: ['demo'],
        audiences: [`demo${id.substring(2)}`],
      })

      const {
        provisioning: {
          oauth2Client,
          p1: { app },
        },
      } = createdApp
      const createdOauthClientId = oauth2Client.id
      setApp({
        id: createdOauthClientId,
        displayName: app.displayName,
        active: app.active,
        loginUri: oauth2Client.redirect_uris[0],
        logoutUri: oauth2Client.post_logout_redirect_uris?.[0],
        corsOrigin: oauth2Client.allowed_cors_origins[0],
      })
      onSuccess()
    } catch (e: any) {
      // what to do on error??
    }
  }

  if (!!appsError || !!integrationsError) {
    return <div>{JSON.stringify(appsError || integrationsError)}</div>
  }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
      <ConfigureApp
        apps={apps}
        app={app || null}
        integrations={integrations}
        integration={integration}
        setIntegration={setIntegration}
        setApp={setApp}
        onSubmit={onSubmit}
        onCancel={onCancel}
        onCreateApp={createApp}
      />
    </div>
  )
}

export default Demo
