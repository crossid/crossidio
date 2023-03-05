import { Fragment, useContext, useMemo, useState } from 'react'
import { TenantContext } from '@/hooks/tenant'
import { IApp, IAppConfigureData } from '@/types'
import { Dialog, Transition } from '@headlessui/react'
import { ConfigureAppInput, Selector } from '@/components/ConfigureApp'
import { tuplesToIApps, useApps } from '@/hooks/apps'

// repoName is `${owner}/${repo}`
export default function DownloadSampleButton({
  repoName,
  folderName,
}: {
  repoName: string
  folderName?: string
}) {
  const { app, setApp } = useContext(TenantContext)
  const [showModal, setShowModal] = useState(false)
  const { apps: appTuples, appsError } = useApps()

  const apps: IApp[] = useMemo(() => {
    if (!appTuples) {
      return []
    }

    return tuplesToIApps(appTuples)
  }, [appTuples])

  const url = useMemo(() => {
    // nextjs base url
    let baseUrl = '/api/sample'
    let data = { repoName, folderName }
    if (!!app) {
      data = Object.assign(data, app)
      // must be a get request, so I send the data in the query param as base64 encoded object
      const base64 = Buffer.from(JSON.stringify(data)).toString('base64')
      baseUrl += `?data=${base64}`
    }

    return baseUrl
  }, [app, folderName, repoName])

  function openModal() {
    setShowModal(true)
  }

  function closeModal() {
    // unset demo data on modal close
    setShowModal(false)
  }

  // downloading a file only works from anchor elements, so that's what I did
  function downloadExample() {
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  // modal download button should be disabled without required attributes
  function isSubmitDisabled(): boolean {
    return !app || !app.loginUri || !app.clientId
  }

  return (
    <>
      <button onClick={openModal}>Download Example</button>

      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Select an application to configure the sample accordingly
                  </Dialog.Title>
                  <div className="mt-2">
                    <Selector
                      app={app || null}
                      setApp={setApp}
                      apps={apps}
                      showStatus
                    />
                    <>
                      <ConfigureAppInput
                        title="Client ID"
                        placeholder="Client ID"
                        id="client_id"
                        required
                        value={app?.clientId || ''}
                        setValue={(d) => {}}
                      />
                      <ConfigureAppInput
                        title="Login Redirect URL"
                        placeholder="Login URL"
                        id="redirect_uri"
                        required
                        value={app?.loginUri || ''}
                        setValue={(d) => {}}
                      />
                      <ConfigureAppInput
                        title="Logout Redirect URL"
                        id="post_logout_redirect_uri"
                        value={app?.logoutUri || ''}
                        setValue={(d: string) => {}}
                        placeholder={'Logout Redirect'}
                      />
                      <ConfigureAppInput
                        title="Web Origin"
                        id="allowed_cors_origin"
                        value={app?.corsOrigin || ''}
                        setValue={(d) => {}}
                        placeholder={'Web Origin'}
                      />
                    </>
                  </div>

                  <div className="mt-4">
                    <button
                      disabled={isSubmitDisabled()}
                      type="submit"
                      onClick={downloadExample}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Download Example
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
