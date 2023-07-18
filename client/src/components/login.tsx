import { SyntheticEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button } from '@mui/material'
import { useLoginUser } from './actions'
import { useAlertCtx } from './context-providers/alert'
import { useTokenCtx } from './context-providers/token'
import { useNavigate, useLocation } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const alertCtx = useAlertCtx()
  const tokenCtx = useTokenCtx()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username)
    }
  }, [])

  const { mutate: loginUser } = useLoginUser(
    alertCtx?.setAlertPayload,
    tokenCtx?.addToken,
    navigate,
  )

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    loginUser({ username, password })
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" component="h1">
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign In
        </Button>
      </form>
    </Container>
  )
}

export default LoginForm
