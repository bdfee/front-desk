import { TextField, Grid, Button } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { SpecialistFormProps } from '../../types'
import {
  validateTextInput,
  sanitizeTextInput,
} from '../../validations/specialist'

const SpecialistForm = (props: SpecialistFormProps) => {
  const [name, setName] = useState('')
  const [speciality, setSpeciality] = useState('')

  const addSpecialist = (event: SyntheticEvent) => {
    event.preventDefault()
    if (!validateTextInput(name) || !validateTextInput(speciality)) {
      return props.setError('invalid value provided')
    }

    props.onSubmit({
      name: sanitizeTextInput(name),
      speciality: sanitizeTextInput(speciality),
    })
    setName('')
    setSpeciality('')
  }

  return (
    <div>
      <form onSubmit={addSpecialist}>
        <TextField
          id="name"
          label="Name"
          fullWidth
          value={name}
          onChange={({ target }) => {
            setName(target.value)
          }}
        />
        <TextField
          id="speciality"
          label="Specialty"
          fullWidth
          value={speciality}
          onChange={({ target }) => setSpeciality(target.value)}
        />
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={props.onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default SpecialistForm
