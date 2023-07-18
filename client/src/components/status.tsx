import { useContext } from 'react'
import { AlertCtx } from '../components/context-providers/alert'
import { Alert, Box } from '@mui/material'

interface StatusPropsType {
  location: 'page' | 'modal'
}

const Status = ({ location }: StatusPropsType) => {
  const alertCtx = useContext(AlertCtx)

  if (location === alertCtx?.alertPayload?.location) {
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
  } else return null
}

export default Status
