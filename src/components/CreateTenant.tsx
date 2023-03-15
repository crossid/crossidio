import { Envs } from '@/data/envs'
import { Regions } from '@/data/regions'
import useTenant, { Tenant, TenantContext } from '@/hooks/tenant'
import { Env, ITenant, Region } from '@/types'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Dispatch, Fragment, SetStateAction, useContext, useEffect, useState } from 'react'
import {
  useForm,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
  FieldErrors,
} from 'react-hook-form'
import { formatError } from '@/utils/error'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { crossidPublicDomain } from '@/utils/location'

type Inputs = {
  tenantId: string
  region: Region
  env: Env
}

export function CreateTenantButton({
  className,
  children,
  onTenantCreated,
}: {
  className: string
  children: string
  onTenantCreated: (t: ITenant) => void
}) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <CreateTenant
        onTenantCreated={onTenantCreated}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <button className={className} onClick={() => setShowModal(true)}>
        {children}
      </button>
    </>
  )
}

export default function CreateTenant({
  onTenantCreated,
  showModal,
  setShowModal,
}: {
  onTenantCreated: (t: ITenant) => void
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}) {
  const { setTenant } = useContext(TenantContext)
  const { create, get } = useTenant()
  const [createdTenant, setCreatedTenant] = useState<Tenant | undefined>()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const id = window.setInterval(async () => {
      if (!!createdTenant && createdTenant.provisioningStatus === 'started') {
        try {
          const t = await get(createdTenant.id)
          if (t.provisioningStatus === 'completed') {
            window.clearInterval(id)
            setCreatedTenant(undefined)
            setTenant(t)
          } else if (t.provisioningStatus === 'fatal') {
            // failed to create the tenant
            window.clearInterval(id)
            setCreatedTenant(undefined)
            setError('failed to create tenant')
          }
        } catch (err: any) {
          // this is a "get" error
          setError(`failed to get tenant: ${err.toString()}`)
          window.clearInterval(id)
          setCreatedTenant(undefined)
        }
      }
    }, 2000)

    return () => window.clearInterval(id)
  }, [createdTenant, get, setTenant])

  async function onSubmit({ region, env, tenantId }: Inputs) {
    setError('')
    try {
      setSubmitting(true)
      const createdTenant = await create({
        displayName: tenantId,
        tenantId,
        type: 'developer',
        regionCode: region,
        environmentTag: env,
      })
      onTenantCreated(createdTenant)
      setCreatedTenant(createdTenant)
    } catch (e: any) {
      setError(formatError(e))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <CreateTenantModal
        onSubmit={onSubmit}
        submitting={submitting || !!createdTenant}
        error={error}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  )
}

export function CreateTenantModal({
  onSubmit,
  submitting,
  error,
  showModal,
  setShowModal,
}: {
  onSubmit: SubmitHandler<Inputs>
  submitting: boolean
  error?: string
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      region: Regions[0].code,
      env: Envs[0].env,
    },
  })

  function closeModal() {
    setShowModal(false)
  }

  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-20 overflow-y-auto" onClose={closeModal}>
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </Dialog.Overlay>
          </Transition.Child>
          <Transition.Child
            enter="ease-out transform duration-150"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in transform duration-100"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:align-middle">
              <div className="w-full bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    <PlusCircleIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Create Tenant
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-400">
                        Tenant is a private namespace that holds all resources related to identity
                        management.{' '}
                        <Link href="/docs/concepts/tenant" className="text-indigo-500">
                          Learn more
                        </Link>
                      </p>
                      <div className="relative mt-10 inline-block text-left">
                        {error && (
                          <p className="mb-6 w-full rounded-md bg-red-100 p-2 text-center">
                            {error}
                          </p>
                        )}
                        <CreateTenantForm
                          onSubmit={onSubmit}
                          watch={watch}
                          errors={errors}
                          handleSubmit={handleSubmit}
                          register={register}
                          setValue={setValue}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="focus:shadow-outline-red inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none disabled:opacity-60 sm:ml-3 sm:w-auto sm:text-sm"
                  disabled={submitting}
                >
                  Create
                </button>
                <button
                  onClick={closeModal}
                  className="focus:shadow-outline-indigo mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none disabled:opacity-60 sm:mt-0 sm:w-auto sm:text-sm"
                  disabled={submitting}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
function CreateTenantForm({
  onSubmit,
  register,
  handleSubmit,
  setValue,
  watch,
  errors,
}: {
  onSubmit: SubmitHandler<Inputs>
  register: UseFormRegister<Inputs>
  handleSubmit: UseFormHandleSubmit<Inputs>
  setValue: UseFormSetValue<Inputs>
  watch: UseFormWatch<Inputs>
  errors: FieldErrors<Inputs>
}) {
  const env = watch('env')
  const region = watch('region')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sm:col-span-3">
        <label htmlFor="tenantId" className="block text-sm font-medium text-gray-700">
          Domain Name
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            {...register('tenantId', { required: true })}
            type="text"
            className="form-input block w-full rounded-md border-gray-300 pr-40 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="tenant id"
            aria-describedby="tenant-region"
            autoComplete="off"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500 sm:text-sm" id="tenant-region">
              {region.toLocaleLowerCase()}.{crossidPublicDomain()}
            </span>
          </div>
        </div>
        {errors.tenantId && <span className="text-indigo-500">This field is required</span>}
        <p className="mt-2 text-sm text-gray-500">
          The tenant domain is used for API endpoints of your application and cannot be renamed.
        </p>
      </div>
      <div>
        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
          Environment
        </label>
        <RadioGroup
          value={env}
          onChange={(v: Env) => {
            setValue('env', v)
          }}
          className="mt-2"
        >
          <RadioGroup.Label className="sr-only"> Environment </RadioGroup.Label>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {Envs.map((env) => (
              <RadioGroup.Option
                key={env.name}
                value={env.env}
                className={({ active, checked }) =>
                  clsx(
                    'cursor-pointer focus:outline-none',
                    active ? 'ring-2 ring-indigo-600 ring-offset-2' : '',
                    checked
                      ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                      : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
                    'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1'
                  )
                }
              >
                <RadioGroup.Label as="span">{env.name}</RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div>
        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
          Region
        </label>
        <RadioGroup
          value={region}
          onChange={(v: Region) => {
            setValue('region', v)
          }}
          className="mt-2"
        >
          <RadioGroup.Label className="sr-only"> Region </RadioGroup.Label>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-3">
            {Regions.map((option) => (
              <RadioGroup.Option
                key={option.name}
                value={option.code}
                className={({ active, checked, disabled }) =>
                  clsx(
                    disabled ? 'cursor-not-allowed opacity-60' : '',
                    active ? 'ring-2 ring-indigo-600 ring-offset-2' : '',
                    checked
                      ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                      : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
                    'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1'
                  )
                }
                disabled={option.disabled}
              >
                <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* <div className="pt-4 sm:flex sm:pt-4">
        <button
          onClick={onCancel}
          className='className="ml-4 dark:focus:ring-sky-500" inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-xs font-bold leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-sky-500 dark:ring-offset-slate-900 dark:hover:bg-sky-700'
        >
          <span>Cancel</span>
        </button>
        <button
          type="submit"
          className='className="ml-4 dark:focus:ring-sky-500" inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-xs font-bold leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-sky-500 dark:ring-offset-slate-900 dark:hover:bg-sky-700'
        >
          <span>Create</span>
        </button>
      </div> */}
    </form>
  )
}
