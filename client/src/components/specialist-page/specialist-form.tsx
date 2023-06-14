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
    <form onSubmit={addSpecialist} aria-label="Specialist form">
      <TextField
        id="name"
        label="Name"
        fullWidth
        value={name}
        onChange={({ target }) => {
          setName(target.value)
        }}
        aria-label="Name input"
      />
      <TextField
        id="speciality"
        label="Specialty"
        fullWidth
        value={speciality}
        onChange={({ target }) => setSpeciality(target.value)}
        aria-label="Specialty input"
      />
      <Grid>
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            style={{ float: 'left' }}
            type="button"
            onClick={props.onCancel}
            aria-label="Cancel button"
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
            aria-label="Add button"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default SpecialistForm
