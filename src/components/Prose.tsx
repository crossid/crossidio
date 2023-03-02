import clsx from 'clsx'

const Prose: React.FC<JSX.IntrinsicElements['div']> = (props) => (
  <div
    {...props}
    className={clsx(
      props.className,
      'prose prose-slate max-w-none dark:prose-invert dark:prose-dark'
    )}
  ></div>
)

export { Prose }
