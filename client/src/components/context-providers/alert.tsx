import { createContext, useState, ReactNode } from 'react'
import { AlertCtxType, NullableAlertPayload } from '../../types'
export const AlertCtx = createContext<AlertCtxType | null>(null)

const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alertPayload, setAlertPayload] = useState<NullableAlertPayload>()

  const setAlertWithTimeout: AlertCtxType['setAlertPayload'] = (
    type,
    message,
    location,
  ) => {
    setAlertPayload({ type, message, location })

    const id = setTimeout(() => {
      setAlertPayload(undefined)
    }, 3000)

    return () => clearTimeout(id)
  }

  const AlertCtxValue: AlertCtxType = {
    setAlertPayload: setAlertWithTimeout,
    alertPayload,
  }

  return <AlertCtx.Provider value={AlertCtxValue}>{children}</AlertCtx.Provider>
}

export default AlertProvider
