import clsx from 'clsx'
import { forwardRef, Fragment, ReactNode } from 'react'

export interface Line {
  types: string[]
  content: string
  empty: boolean
}

export function CodeWindow({
  children,
  className,
  border = true,
}: {
  children: ReactNode
  className?: string
  border: boolean
}) {
  return (
    <div
      className={clsx(
        'relative flex h-[31.625rem] max-h-[60vh] overflow-hidden bg-slate-800 shadow-xl dark:bg-slate-900/70 dark:ring-1 dark:ring-inset dark:ring-white/10 dark:backdrop-blur sm:max-h-[none] sm:rounded-xl lg:h-[34.6875rem] xl:h-[31.625rem]',
        className
      )}
    >
      <div className="relative flex w-full flex-col">
        <div
          className={clsx(
            'flex-none',
            border && 'border-b border-slate-500/30'
          )}
        >
          <div className="flex h-8 items-center space-x-1.5 px-3">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-600" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-600" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-600" />
          </div>
          {/* <div className="h-px bg-gradient-to-r from-sky-300/0 via-sky-300/20 to-sky-300/0" /> */}
        </div>
        <div className="relative flex min-h-0 flex-auto flex-col">
          {children}
        </div>
      </div>
    </div>
  )
}

export function getClassNameForToken({ types, empty }: ILine) {
  const typesSize = types.length
  if (typesSize === 1 && types[0] === 'plain') {
    return empty ? 'inline-block' : undefined
  }
  return [...types, empty ? 'inline-block' : 'token'].join(' ')
}

interface Code2Props {
  lines?: number
  showLineNumbers?: boolean
  initialLineNumber?: number
  overflow?: boolean | 'y' | 'x'
  wrap?: boolean
  className?: string
  language?: string
  children: ReactNode[]
}

CodeWindow.Code2 = forwardRef<HTMLDivElement, Code2Props>(function Code(
  {
    lines = 0,
    showLineNumbers = true,
    initialLineNumber = 1,
    overflow = true,
    wrap = false,
    className,
    children,
    language,
  }: Code2Props,
  ref
) {
  return (
    <div
      ref={ref}
      className={clsx(className, 'flex min-h-0 w-full flex-auto', {
        'overflow-auto': overflow === true || overflow === 'y',
      })}
    >
      <div className="relative w-full flex-auto">
        <pre
          className={clsx(
            'flex min-h-full text-sm leading-6',
            language && `language-${language}`
          )}
        >
          {showLineNumbers && (
            <div
              aria-hidden="true"
              className="hidden w-[3.125rem] flex-none select-none py-4 pr-4 text-right text-slate-600 md:block"
            >
              {Array.from({ length: lines }).map((_, i) =>
                i === 0 ? (
                  i + initialLineNumber
                ) : (
                  <Fragment key={i + initialLineNumber}>
                    <br />
                    {i + initialLineNumber}
                  </Fragment>
                )
              )}
            </div>
          )}
          <code
            className={clsx(
              'relative block flex-auto text-slate-50',
              {
                'overflow-auto': overflow === true || overflow === 'x',
                'whitespace-pre-wrap': wrap,
                'p-4': showLineNumbers,
              },
              language && `language-${language}`
            )}
          >
            {children}
          </code>
        </pre>
      </div>
    </div>
  )
})
