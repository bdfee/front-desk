import { TextField, Grid, Button } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { SpecialistFormProps } from '../../types'
import {
  validateTextInput,
  sanitizeTextInput,
} from '../../validations/specialist'

const SpecialistForm = (props: SpecialistFormProps) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [speciality, setSpeciality] = useState('')

  const addSpecialist = (event: SyntheticEvent) => {
    event.preventDefault()

    if (!validateTextInput(firstName)) {
      props.setError('invalid first name')
      setFirstName('')
      return
    }

    if (!validateTextInput(lastName)) {
      props.setError('invalid last name')
      setLastName('')
      return
    }

    if (!validateTextInput(speciality)) {
      props.setError('invalid speciality')
      setSpeciality('')
      return
    }

    props.onSubmit({
      name: sanitizeTextInput(firstName) + ' ' + sanitizeTextInput(lastName),
      speciality: sanitizeTextInput(speciality),
    })
    setFirstName('')
    setLastName('')
    setSpeciality('')
  }

  const fieldsFilled =
    !firstName.trim() || !lastName.trim() || !speciality.trim()

  return (
    <form onSubmit={addSpecialist} aria-label="Specialist form">
      <TextField
        id="first-name"
        label="First name"
        fullWidth
        value={firstName}
        onChange={({ target }) => {
          setFirstName(target.value)
        }}
        aria-label="First name input"
      />
      <TextField
        id="last-name"
        label="Last name"
        fullWidth
        value={lastName}
        onChange={({ target }) => {
          setLastName(target.value)
        }}
        aria-label="Last name input"
      />
      <TextField
        id="speciality"
        label="Speciality"
        fullWidth
        value={speciality}
        onChange={({ target }) => setSpeciality(target.value)}
        aria-label="Speciality input"
      />
      <Grid>
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            style={{ float: 'right' }}
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
            disabled={fieldsFilled}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default SpecialistForm
