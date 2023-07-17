import { SyntheticEvent, useState, useContext } from 'react'
import { Container, Typography, TextField, Button } from '@mui/material'
import { useLoginUser } from './actions'
import { AlertCtx } from '../components/context-providers/alert'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const alertCtx = useContext(AlertCtx)

  const { mutate: loginUser } = useLoginUser(alertCtx?.setAlertPayload)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    console.log('Username:', username)
    console.log('Password:', password)

    loginUser({ username, password })

    setUsername('')
    setPassword('')
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
