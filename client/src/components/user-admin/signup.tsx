import { SyntheticEvent, useState } from 'react'
import { TextField, Button, Grid } from '@mui/material'
import { useCreateUser } from './actions'
import { useNavigate } from 'react-router-dom'
import { useAlertCtx } from '../context-providers/alert'

const SignupForm = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const alertCtx = useAlertCtx()

  const { mutate: createUser } = useCreateUser(
    alertCtx?.setAlertPayload,
    navigate,
  )

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    createUser({ name, username, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default SignupForm
