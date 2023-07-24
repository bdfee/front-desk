import { Box, Typography, Button, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import { getSecureLocalStorageName } from './actions'
const LoginStatus = () => {
  const loggedInUsername = getSecureLocalStorageName()
  return loggedInUsername ? (
    <Box
      sx={{
        backgroundColor: 'rgba(224, 224, 224, 1)',
        borderRadius: '6px',
        width: 'max-content',
        padding: '4px 10px',
      }}
    >
      <Grid container alignItems="center" justifyItems="center">
        <Grid xs={8} item>
          <Typography>howdy, {loggedInUsername}</Typography>
        </Grid>
        <Grid xs={4} item>
          {' '}
          <Button
            component={Link}
            size="small"
            to="/logout"
            sx={{
              lineHeight: 1,
              '&:hover': {
                color: 'red',
              },
            }}
          >
            logout
          </Button>
        </Grid>
      </Grid>
    </Box>
  ) : null
}

export default LoginStatus
