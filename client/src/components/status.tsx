import { useContext } from 'react'
import { AlertCtx } from '../App'
import { Alert, Box } from '@mui/material'

const Status = () => {
  const alertCtx = useContext(AlertCtx)
  return (
    <Box>
      {alertCtx?.alertPayload?.type === 'error' && (
        <Alert severity="error" role="alert">
          Error: {alertCtx?.alertPayload?.message}
        </Alert>
      )}
      {alertCtx?.alertPayload?.type === 'success' && (
        <Alert severity="success" role="alert">
          {alertCtx?.alertPayload?.message}
        </Alert>
      )}
    </Box>
  )
}

export default Status
