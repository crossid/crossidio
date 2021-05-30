import NoLayout from '@/layouts/none'
import { FormEvent, useState } from 'react'

function Login() {
  const [domain, setDomain] = useState('crossid.io')
  const [tenantId, setTenantId] = useState('')

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!tenantId || tenantId.length < 3) {
      return
    }
    window.location.href = `https://${tenantId}.${domain}/auth/login`
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
        {/* <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            create new account
          </a>
        </p> */}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={submit} className="space-y-6" action="#" method="POST">
            <div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <label htmlFor="tenantId" className="sr-only">
                  Org ID
                </label>
                <input
                  type="text"
                  autoFocus
                  name="tenantId"
                  id="tenantId"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="my-org"
                  value={tenantId}
                  onChange={(e) => setTenantId(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label htmlFor="domain" className="sr-only">
                    Domain
                  </label>
                  <select
                    id="domain"
                    name="domain"
                    className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                    onChange={(e) => setDomain(e.target.value)}
                    value={domain}
                  >
                    <option>.crossid.io</option>
                    {/* <option>.crossid-preview.io</option> */}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                {/* <span className="px-2 bg-white text-gray-500">Or continue with</span> */}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm">
                <a
                  href="#"
                  className="w-full inline-flex justify-center font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Don't know your org?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Login.layoutProps = {
  Layout: NoLayout,
  meta: {
    title: 'Login',
  },
}

export default Login
