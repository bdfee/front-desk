import { TextField, Grid, Button } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { validateTextInput, sanitizeTextInput } from '../../validations/inputs'
import { useQueryClient } from '@tanstack/react-query'
import { SpecialistFormProps } from '../../types'
import { useCreateSpecialist } from './actions'

const SpecialistForm = ({ closeModal, setError }: SpecialistFormProps) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [speciality, setSpeciality] = useState('')

  const queryClient = useQueryClient()

  const { mutate: createSpecialist } = useCreateSpecialist(queryClient)

  const handleAddSpecialist = (event: SyntheticEvent) => {
    event.preventDefault()

    if (!validateTextInput(firstName)) {
      setError('invalid first name')
      setFirstName('')
      return
    }

    if (!validateTextInput(lastName)) {
      setError('invalid last name')
      setLastName('')
      return
    }

    if (!validateTextInput(speciality)) {
      setError('invalid speciality')
      setSpeciality('')
      return
    }

    createSpecialist({
      name: sanitizeTextInput(firstName) + ' ' + sanitizeTextInput(lastName),
      speciality: sanitizeTextInput(speciality),
    })

    closeModal()
    setFirstName('')
    setLastName('')
    setSpeciality('')
  }

  const fieldsFilled =
    !firstName.trim() || !lastName.trim() || !speciality.trim()

  return (
    <form onSubmit={handleAddSpecialist} aria-label="Specialist form">
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
            onClick={closeModal}
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
