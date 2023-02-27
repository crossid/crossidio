import { createContext, Dispatch, SetStateAction, useState } from 'react'

type FieldsContextProps = {
  fields?: Record<string, any>
  setField: (key: string, value: any) => void
}

export const FieldsContext = createContext<FieldsContextProps>({
  setField: (key: string, value: any) => {},
})

export function FieldProvider({ children }: { children: React.ReactNode }) {
  const [fields, setFields] = useState<Record<string, any> | undefined>()

  function setField(key: string, val: any) {
    setFields({ ...fields, [key]: val })
  }

  return (
    <FieldsContext.Provider value={{ fields, setField }}>
      {children}
    </FieldsContext.Provider>
  )
}
