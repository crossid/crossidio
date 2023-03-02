import { Fragment, useContext, useMemo, useState } from 'react'
import { TenantContext } from '@/hooks/tenant'
import { IAppConfigureData } from '@/types'
import { Dialog, Transition } from '@headlessui/react'
import { ConfigureAppInput } from '@/components/ConfigureApp'

// repoName is `${owner}/${repo}`
export default function DownloadSampleButton({
  repoName,
}: {
  repoName: string
}) {
  const { app } = useContext(TenantContext)
  const [showModal, setShowModal] = useState(false)
  const [demoApp, setDemoApp] = useState<IAppConfigureData | undefined>()

  // determine if the data is from a selected app or the demo data, if available
  const data = useMemo(() => {
    if (!!app) {
      return {
        repoName,
        ...app,
      }
    } else if (!!demoApp) {
      return {
        repoName,
        ...demoApp,
      }
    }

    return null
  }, [app, demoApp, repoName])

  const url = useMemo(() => {
    // nextjs base url
    let baseUrl = '/api/sample'
    // must be a get request, so I send the data in the query param as base64 encoded object
    const base64 = Buffer.from(JSON.stringify(data)).toString('base64')
    baseUrl += `?data=${base64}`

    return baseUrl
  }, [data])

  function openModal() {
    // only set demo data when modal is open
    setDemoApp({
      clientId: 'demoApp',
      loginUri: 'http://localhost:3000',
      logoutUri: 'http://localhost:3000',
      corsOrigin: 'http://localhost:3000*',
    })
    setShowModal(true)
  }

  function closeModal() {
    // unset demo data on modal close
    setShowModal(false)
    window.setTimeout(() => setDemoApp(undefined), 300)
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
    return !demoApp?.loginUri || !demoApp?.clientId
  }

  return (
    <>
      {!!data ? (
        <a href={url}>Download Example</a>
      ) : (
        <button onClick={openModal}>Download Example</button>
      )}

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
                    Input basic data from the example
                  </Dialog.Title>
                  <div className="mt-2">
                    <>
                      <ConfigureAppInput
                        title="Application ID"
                        placeholder="App ID"
                        id="app_id"
                        required
                        value={demoApp?.clientId || ''}
                        setValue={(d) => {
                          setDemoApp(demoApp && { ...demoApp, clientId: d })
                        }}
                      />
                      <ConfigureAppInput
                        title="Login Redirect URL"
                        placeholder="Login URL"
                        id="redirect_uri"
                        required
                        value={demoApp?.loginUri || ''}
                        setValue={(d) => {
                          setDemoApp(demoApp && { ...demoApp, loginUri: d })
                        }}
                      />
                      <ConfigureAppInput
                        title="Logout Redirect URL"
                        id="post_logout_redirect_uri"
                        value={demoApp?.logoutUri || ''}
                        setValue={(d: string) => {
                          setDemoApp(demoApp && { ...demoApp, logoutUri: d })
                        }}
                        placeholder={'Logout Redirect'}
                      />
                      <ConfigureAppInput
                        title="Web Origin"
                        id="allowed_cors_origin"
                        value={demoApp?.corsOrigin || ''}
                        setValue={(d) => {
                          setDemoApp(demoApp && { ...demoApp, corsOrigin: d })
                        }}
                        placeholder={'Web Origin'}
                      />
                    </>
                  </div>

                  <div className="mt-4">
                    <button
                      disabled={isSubmitDisabled()}
                      type="submit"
                      onClick={downloadExample}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
