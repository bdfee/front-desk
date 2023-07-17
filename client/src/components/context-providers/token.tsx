import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'

const TokenCtx = createContext('')
export const useToken = () => useContext(TokenCtx)

const checkTokenValidity = (token: string) => (token ? true : false)

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const storedToken = localStorage.getItem('frontdesk')
    if (!storedToken) {
      return navigate('/login')
    }
    const isTokenValid = checkTokenValidity(storedToken)

    if (!isTokenValid) {
      return navigate('/login')
    }

    setToken(storedToken)
    navigate('/')
  }, [])

  return <TokenCtx.Provider value={token}>{children}</TokenCtx.Provider>
}

export default TokenProvider
