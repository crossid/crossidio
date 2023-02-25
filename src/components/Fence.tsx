import { IHighlightedLines } from '@/utils/prism/types'
import { codeStyles } from '@/utils/prism/styles'
import { ICodeLang } from '@/utils/prism/types'
import clsx from 'clsx'
import { Fragment } from 'react'
import { getClassNameForToken } from './CodeWindow'

export function Fence({
  lines,
  language,
  showLineNumbers = true,
  overflow = true,
  wrap = false,
  highlights,
  className,
}: {
  language: ICodeLang
  lines: IToken[][]
  showLineNumbers?: boolean
  overflow?: boolean
  wrap?: boolean
  highlights: IHighlightedLines
  className: string
}) {
  return (
    <div
      className={clsx(className, 'flex min-h-0 w-full flex-auto', {
        'overflow-auto': overflow === true,
      })}
    >
      <div className="relative w-full flex-auto">
        <pre
          className={clsx(
            'flex text-sm leading-6',
            language && `language-${language}`
          )}
        >
          {showLineNumbers && (
            <div
              aria-hidden="true"
              // todo: in CodeWindow we have p-4 here it harms the lines alignment
              className="hidden w-[3.125rem] flex-none select-none pr-4 text-right text-slate-600 md:block"
            >
              {Array.from(lines).map((_, i) =>
                i === 0 ? (
                  i + 1
                ) : (
                  <Fragment key={i}>
                    <br />
                    {i + 1}
                  </Fragment>
                )
              )}
            </div>
          )}
          <code
            className={clsx(
              'relative block flex-auto',
              {
                'overflow-auto': overflow === true,
                'whitespace-pre-wrap': wrap,
                'p-4': showLineNumbers,
              },
              language && `language-${language}`
            )}
          >
            {lines.map((tokens, lineIndex) => (
              <div
                key={lineIndex}
                className={clsx(
                  highlights.highlighted.includes(lineIndex) &&
                    codeStyles.highlighted
                )}
              >
                {tokens.map((token, tokenIndex) => {
                  return (
                    <span
                      key={tokenIndex}
                      className={getClassNameForToken(token)}
                    >
                      {token.content}
                    </span>
                  )
                })}
                {'\n'}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}
