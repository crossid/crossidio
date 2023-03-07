import { Fragment, useContext, useMemo, useState } from 'react'
import { TenantContext } from '@/hooks/tenant'
import { IApp } from '@/types'
import { Dialog, Transition } from '@headlessui/react'
import { ConfigureAppInput, Selector } from '@/components/ConfigureApp'
import { tuplesToIApps, useApps } from '@/hooks/apps'
import {
  ArrowDownTrayIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '@crossid/crossid-react'

// repoName is `${owner}/${repo}`
export default function DownloadSampleButton({
  repoName,
  folderName,
  className,
}: {
  repoName: string
  folderName?: string
  className?: string
}) {
  const { app, setApp } = useContext(TenantContext)
  const { idToken, loginWithRedirect } = useAuth()
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
      {idToken && (
        <button className={className} onClick={openModal}>
          <ArrowDownTrayIcon
            className="-ml-1 mr-2 h-5 w-5"
            aria-hidden="true"
          />
          <span>Download Example</span>
        </button>
      )}

      {!idToken && (
        <button
          className={className}
          onClick={() =>
            loginWithRedirect({
              state: {
                return_to: window.location.pathname,
              },
            })
          }
        >
          <ArrowRightOnRectangleIcon
            className="-ml-1 mr-2 h-5 w-5"
            aria-hidden="true"
          />
          <span>Login to Download Sample</span>
        </button>
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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all md:p-16 xl:p-32">
                  <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => closeModal()}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="">
                    <Dialog.Title
                      as="h3"
                      className="pb-3 text-lg font-medium leading-6 text-gray-900"
                    >
                      Select an application to configure the sample accordingly.
                    </Dialog.Title>
                    <Dialog.Title
                      as="h2"
                      className="pb-8 text-sm font-medium text-gray-400"
                    >
                      Code will be downloaded from the github sample repo.
                    </Dialog.Title>
                  </div>

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
                      value={app?.clientId || ''}
                      setValue={(d) => {}}
                    />
                    <ConfigureAppInput
                      title="Login Redirect URL"
                      placeholder="Login URL"
                      id="redirect_uri"
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

                  <div className="mt-5 sm:mt-4 sm:flex">
                    <button
                      disabled={isSubmitDisabled()}
                      type="submit"
                      onClick={downloadExample}
                      className={className}
                    >
                      <ArrowDownTrayIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      <span>Download</span>
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
