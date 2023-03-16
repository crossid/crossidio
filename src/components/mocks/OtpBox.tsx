const otpSize = new Array(5).fill(null)
export default function OtpBox() {
  return (
    <div className="relative z-10 mx-auto rounded-lg text-slate-900 shadow-xl dark:text-slate-300 sm:w-[23.4375rem]">
      <div className="overflow-hidden rounded-lg bg-white p-8 ring-1 dark:bg-slate-800 dark:ring-0 dark:highlight-white/5">
        <div className="p-4">
          <div className="text-brand-700 hover:text-brand-600 bg-brand-100 mb-2 rounded-lg bg-indigo-100 p-3 text-sm font-medium text-indigo-500 dark:bg-slate-700 dark:text-sky-500">
            OTP code sent to: a***n@crossid.io
          </div>
        </div>

        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-slate-400"
            >
              Please submit code
            </label>
            <div className="mt-2 flex gap-x-4">
              {otpSize.map((_, i) => (
                <input
                  key={i}
                  required
                  maxLength={1}
                  type="tel"
                  className="form-input block w-full rounded-md border border-gray-300 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 sm:text-sm"
                />
              ))}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled
              className="flex w-full cursor-default justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-sky-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
