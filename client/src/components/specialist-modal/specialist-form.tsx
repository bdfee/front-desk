import { TextField, Grid, Button } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { Specialist, SpecialistInput } from '../../types'
import { validateTextInput, sanitizeTextInput } from '../../validations/inputs'
import { useMutation } from 'react-query'
import specialistService from '../../services/specialist'
import { queryClient } from '../../App'

interface SpecialistFormProps {
  onClose: () => void
  setError: (errorMessage: string) => () => void
}

const SpecialistForm = ({ onClose, setError }: SpecialistFormProps) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [speciality, setSpeciality] = useState('')

  const addSpecialist = useMutation<Specialist, Error, [SpecialistInput]>(
    (variables) => {
      const [values] = variables
      return specialistService.create(values)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['GET_SPECIALISTS_TABLE'] })
      },
      onError: (error: Error) => console.log('Error: ', error.message),
    },
  )

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

    addSpecialist.mutate([
      {
        name: sanitizeTextInput(firstName) + ' ' + sanitizeTextInput(lastName),
        speciality: sanitizeTextInput(speciality),
      },
    ])

    setFirstName('')
    setLastName('')
    setSpeciality('')
  }

  if (addSpecialist.isError) {
    setError('Error ' + addSpecialist.error.message)
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
            onClick={onClose}
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
