import { TextField, Grid, Button } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { PatientFormProps } from '../../types'
import { validateTextInput, sanitizeTextInput } from '../../validations/inputs'

const PatientForm = (props: PatientFormProps) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')
  const [specialistId, setSpecialistId] = useState<number | undefined>(
    undefined,
  )

  const addPatient = (event: SyntheticEvent) => {
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

    if (!validateTextInput(email)) {
      props.setError('invalid email')
      setEmail('')
      return
    }

    if (!validateTextInput(phone)) {
      props.setError('invalid phone')
      setFirstName('')
      return
    }

    if (!validateTextInput(dateOfBirth)) {
      props.setError('invalid date of birth')
      setLastName('')
      return
    }

    if (!validateTextInput(gender)) {
      props.setError('invalid gender')
      setEmail('')
      return
    }

    if (!validateTextInput(address)) {
      props.setError('invalid gender')
      setEmail('')
      return
    }

    if (!specialistId) {
      props.setError('invalid selection')
      setSpecialistId(undefined)
      return
    }

    props.onSubmit({
      name: sanitizeTextInput(firstName) + ' ' + sanitizeTextInput(lastName),
      email: sanitizeTextInput(email),
      phone: sanitizeTextInput(phone),
      dateOfBirth: sanitizeTextInput(dateOfBirth),
      gender: sanitizeTextInput(gender),
      address: sanitizeTextInput(address),
      specialistId: specialistId,
    })
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhone('')
    setDateOfBirth('')
    setGender('')
    setAddress('')
    setSpecialistId(undefined)
  }

  // const fieldsFilled =
  //   !firstName.trim() ||
  //   !lastName.trim() ||
  //   !email.trim() ||
  //   !phone.trim() ||
  //   !dateOfBirth.trim() ||
  //   !gender.trim() ||
  //   !address.trim() ||
  //   !specialistId

  return (
    <form onSubmit={addPatient}>
      <TextField
        label="First name"
        value={firstName}
        onChange={({ target }) => setFirstName(target.value)}
      />
      <TextField
        label="Last name"
        value={lastName}
        onChange={({ target }) => setLastName(target.value)}
        fullWidth
      />
      <TextField
        label="Email"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        fullWidth
      />
      <TextField
        label="Phone"
        value={phone}
        onChange={({ target }) => setPhone(target.value)}
        fullWidth
      />
      <TextField
        label="Date of birth"
        value={dateOfBirth}
        onChange={({ target }) => setDateOfBirth(target.value)}
        fullWidth
      />
      <TextField
        label="Gender"
        value={gender}
        onChange={({ target }) => setGender(target.value)}
        fullWidth
      />
      <TextField
        label="Address"
        value={address}
        onChange={({ target }) => setAddress(target.value)}
        fullWidth
      />
      {/* <TextField
        label="Specialist"
        value={specialistId}
        onChange={({ target }) => setSpecialistId(target.value)}
        fullWidth
      /> */}
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
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default PatientForm
