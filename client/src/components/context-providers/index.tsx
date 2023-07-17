import { ReactNode } from 'react'
import AlertProvider from './alert'
import QueryProvider from './query'
import TokenProvider from './token'

const Providers = ({ children }: { children: ReactNode }) => (
  <QueryProvider>
    <AlertProvider>
      <TokenProvider>{children}</TokenProvider>
    </AlertProvider>
  </QueryProvider>
)

export default Providers
