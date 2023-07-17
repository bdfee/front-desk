import { ReactNode } from 'react'
import AlertProvider from './alert'
import QueryProvider from './query'
import TokenProvider from './token'

const Providers = ({ children }: { children: ReactNode }) => (
  <QueryProvider>
    <TokenProvider>
      <AlertProvider>{children}</AlertProvider>
    </TokenProvider>
  </QueryProvider>
)

export default Providers
