import { createContext, useContext, ReactNode, useState } from 'react'

interface TokenCtxType {
  token: string
  addToken: (token: string) => void
  removeToken: () => void
}

const TokenCtx = createContext<TokenCtxType | null>(null)

export const useTokenCtx = () => {
  if (TokenCtx) {
    return useContext(TokenCtx)
  }
  throw new Error('token context error')
}

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState('')

  const addToken = (token: string) => setToken(token)
  const removeToken = () => setToken('')

  const tokenCtxValue = {
    token,
    addToken,
    removeToken,
  }

  return <TokenCtx.Provider value={tokenCtxValue}>{children}</TokenCtx.Provider>
}

export default TokenProvider
