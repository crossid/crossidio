import { createContext, Dispatch, SetStateAction, useState } from 'react'

type FieldsContextProps = {
  fields?: Record<string, any>
  setField: (key: string, value: any) => void
  setFields: (f: Record<string, any>) => void
}

export const FieldsContext = createContext<FieldsContextProps>({
  setField: (key: string, value: any) => {},
  setFields: (f: Record<string, any>) => {},
})

export function FieldProvider({ children }: { children: React.ReactNode }) {
  const [fields, _setFields] = useState<Record<string, any> | undefined>()

  function setField(key: string, val: any) {
    _setFields({ ...fields, [key]: val })
  }

  function setFields(f: Record<string, any>) {
    _setFields({ ...fields, ...f })
  }

  return (
    <FieldsContext.Provider value={{ fields, setField, setFields }}>
      {children}
    </FieldsContext.Provider>
  )
}
