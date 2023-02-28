import { FieldsContext } from '@/hooks/useFieldsContext'
import { HTMLInputTypeAttribute, ReactNode, useContext } from 'react'
import InlineEdit from '../InlineInput'
import get from 'lodash.get'

export function InlineFields({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2">{children}</div>
}

export function InlineField({
  name,
  text,
  type,
  placeholder,
}: {
  name: string
  text: string
  type: HTMLInputTypeAttribute
  placeholder: string
}) {
  const { fields, setField } = useContext(FieldsContext)

  return (
    <div className="grid grid-cols-2 space-x-4">
      <span>{text}:</span>
      <InlineEdit
        onChange={(val) => setField(name, val)}
        value={fields && fields[name]}
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}

export function Field({ path }: { path: string; children: ReactNode }) {
  const { fields } = useContext(FieldsContext)
  if (!fields) {
    return null
  }

  return <span>{get(fields, path)}</span>
}
