import { Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAlertCtx } from './context-providers/alert'
import { useTokenCtx } from './context-providers/token'
import secureLocalStorage from 'react-secure-storage'

const Logout = () => {
  const tokenCtx = useTokenCtx()
  const alertCtx = useAlertCtx()
  const navigate = useNavigate()

  useEffect(() => {
    if (alertCtx && tokenCtx && navigate) {
      alertCtx?.setAlertPayload('success', 'logged out', 'page')
      tokenCtx?.removeToken()
      secureLocalStorage.removeItem('frontdesk')
      navigate('/')
    }
  }, [alertCtx, tokenCtx, navigate])

  return <Typography>goodbye...</Typography>
}

export default Logout
