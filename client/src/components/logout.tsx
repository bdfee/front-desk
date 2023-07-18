import { Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAlertCtx } from './context-providers/alert'
import { useTokenCtx } from './context-providers/token'

const Logout = () => {
  const tokenCtx = useTokenCtx()
  const alertCtx = useAlertCtx()
  const navigate = useNavigate()

  useEffect(() => {
    if (alertCtx && tokenCtx && navigate) {
      alertCtx?.setAlertPayload('success', 'logged out', 'page')
      tokenCtx?.removeToken()
      navigate('/')
      console.log('here')
    }
  }, [alertCtx, tokenCtx, navigate])

  return <Typography>goodbye...</Typography>
}

export default Logout
