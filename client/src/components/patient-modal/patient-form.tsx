import { SyntheticEvent, useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { Gender, PatientDetail, PatientFormProps } from '../../types'
import {
  validateTextInput,
  sanitizeTextInput,
  sanitizeEmail,
  formatPhone,
  validateEmail,
} from '../../validations/inputs'
import { ErrorCtx } from '../../App'
import { useQueryClient } from '@tanstack/react-query'

import {
  useAddPatient,
  useUpdatePatientById,
  useFetchSpecialists,
} from './actions'

const PatientForm = ({ type, closeModal }: PatientFormProps) => {
  const [patientId, setPatientId] = useState<number | undefined>()
  const [specialistId, setSpecialistId] = useState<string>('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null)
  const [gender, setGender] = useState<string>('')
  const [address, setAddress] = useState('')

  const errorCtx = useContext(ErrorCtx)
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (type === 'update') {
      if (id) {
        const handleSetFormState = ({
          dateOfBirth,
          name,
          email,
          phone,
          gender,
          address,
          specialistId,
          patientId,
        }: PatientDetail) => {
          const dob = dayjs(dateOfBirth)
          const [first, last] = name.split(' ')
          setPatientId(patientId)
          setFirstName(first)
          setLastName(last)
          setEmail(email)
          setPhone(phone)
          setDateOfBirth(dob)
          setGender(gender)
          setAddress(address)
          setSpecialistId(specialistId.toString())
        }
        const formData = queryClient.getQueryData<PatientDetail>([
          'PATIENT',
          +id,
        ])

        if (formData) handleSetFormState(formData)
      }
    }
  }, [])

  const { data: specialistData, status: specialistsStatus } =
    useFetchSpecialists()

  const { mutate: addPatient } = useAddPatient(queryClient)
  const { mutate: updatePatientById } = useUpdatePatientById(queryClient)

  if (specialistsStatus === 'error') {
    return <div>error fetching data</div>
  }

  if (specialistsStatus === 'loading') {
    return <div>loading...</div>
  }

  const fieldsFilled =
    !firstName.trim() ||
    !lastName.trim() ||
    !email.trim() ||
    !phone.trim() ||
    !dateOfBirth ||
    !gender ||
    !address.trim() ||
    !specialistId

  const submitForm = (event: SyntheticEvent) => {
    event.preventDefault()
    if (!validateTextInput(firstName)) {
      errorCtx?.setError('invalid first name')
      setFirstName('')
      return
    }

    if (!validateTextInput(lastName)) {
      errorCtx?.setError('invalid last name')
      setLastName('')
      return
    }

    if (!validateEmail(email)) {
      errorCtx?.setError('invalid email')
      return
    }

    if (!dateOfBirth) {
      errorCtx?.setError('please add date of birth')
      return
    }

    if (!gender) {
      errorCtx?.setError('please specify gender')
      return
    }

    const patientValues = {
      name: sanitizeTextInput(firstName) + ' ' + sanitizeTextInput(lastName),
      email: sanitizeEmail(email),
      phone: phone.replace(/-/g, ''),
      dateOfBirth: dateOfBirth.format('YYYY-MM-DD'),
      gender: sanitizeTextInput(gender),
      address: sanitizeTextInput(address),
      specialistId: +specialistId,
    }
    switch (type) {
      case 'update': {
        if (patientId) {
          updatePatientById({ patientId, values: patientValues })
        }
        break
      }
      case 'add': {
        addPatient(patientValues)
        break
      }
      default: {
        console.log('error with service switch in patient form')
        return
      }
    }
    setPatientId(undefined)
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhone('')
    setDateOfBirth(null)
    setGender('')
    setAddress('')
    setSpecialistId('')
    closeModal()
  }

  return (
    <form onSubmit={submitForm}>
      <TextField
        label="First name"
        value={firstName}
        onChange={({ target }) => setFirstName(target.value)}
        fullWidth
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
        onChange={({ target }) => setPhone(formatPhone(target.value))}
        fullWidth
      />
      <TextField
        label="Address"
        value={address}
        onChange={({ target }) => setAddress(target.value)}
        fullWidth
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date of birth"
          value={dateOfBirth}
          onChange={(e) => {
            setDateOfBirth(e)
          }}
        />
      </LocalizationProvider>
      <InputLabel id="gender">Gender</InputLabel>

      <Select
        labelId="gender"
        value={gender}
        onChange={({ target }) => setGender(target.value)}
      >
        {Object.values(Gender).map((value) => {
          return (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          )
        })}
      </Select>

      <InputLabel id="specialist">Assign Specialist</InputLabel>
      <Select
        labelId="specialist"
        value={specialistId}
        onChange={({ target }) => setSpecialistId(target.value)}
      >
        {specialistData.map((specialist) => {
          return (
            <MenuItem
              key={specialist.specialistId}
              value={specialist.specialistId}
            >
              {specialist.name}
            </MenuItem>
          )
        })}
      </Select>

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
            {type}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default PatientForm
