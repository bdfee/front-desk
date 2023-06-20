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
import specialistService from '../../services/specialist'

import { SyntheticEvent, useEffect, useState, useContext } from 'react'
import { Gender, PatientFormProps, Specialist } from '../../types'
import {
  validateTextInput,
  sanitizeTextInput,
  sanitizeEmail,
} from '../../validations/inputs'

import { formatPhone, validateEmail } from '../../validations/inputs'
import { PatientCtx } from '../../App'
import { FormActionCtx } from '../patient-table'
import { PatientFormActionCtx } from '../patient-information/index'

const PatientForm = (props: PatientFormProps) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null)
  const [gender, setGender] = useState<string>('')
  const [address, setAddress] = useState('')
  const [specialists, setSpecialists] = useState<Specialist[]>()
  const [specialistId, setSpecialistId] = useState<string>('')

  const patientContext = useContext(PatientCtx)
  const patientFormContext = useContext(PatientFormActionCtx)
  const formContext = useContext(FormActionCtx)

  useEffect(() => {
    const fetchSpecialists = async () => {
      const specialists = await specialistService.getAll()
      setSpecialists(specialists)
    }
    fetchSpecialists()
  }, [])

  useEffect(() => {
    if (patientFormContext) {
      const dob = dayjs(patientFormContext.patient.dateOfBirth)
      setFirstName(patientFormContext.patient.name)
      setLastName(patientFormContext.patient.name)
      setEmail(patientFormContext.patient.email)
      setPhone(patientFormContext.patient.phone)
      setDateOfBirth(dob)
      setGender(patientFormContext.patient.gender)
      setAddress(patientFormContext.patient.address)
      setSpecialistId(patientFormContext.patient.specialistId.toString())
    }
  }, [])

  const fieldsFilled =
    formContext?.type === 'add'
      ? !firstName.trim() ||
        !lastName.trim() ||
        !email.trim() ||
        !phone.trim() ||
        !dateOfBirth ||
        !gender ||
        !address.trim() ||
        !specialistId
      : true

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault()
    if (!validateTextInput(firstName)) {
      patientContext?.setError('invalid first name')
      setFirstName('')
      return
    }

    if (!validateTextInput(lastName)) {
      patientContext?.setError('invalid last name')
      setLastName('')
      return
    }

    if (!validateEmail(email)) {
      patientContext?.setError('invalid email')
      return
    }

    if (!dateOfBirth) {
      patientContext?.setError('please add date of birth')
      return
    }

    if (!gender) {
      patientContext?.setError('please specify gender')
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

    if (patientFormContext) {
      props.onUpdate(patientFormContext?.patient.patientId, patientValues)
    } else {
      props.onSubmit(patientValues)
    }

    setFirstName('')
    setLastName('')
    setEmail('')
    setPhone('')
    setDateOfBirth(null)
    setGender('')
    setAddress('')
    setSpecialistId('')
  }
  return (
    <form onSubmit={addPatient}>
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
      {!specialists ? (
        <div>fetching specialists</div>
      ) : (
        <>
          <InputLabel id="specialist">Assign Specialist</InputLabel>
          <Select
            labelId="specialist"
            value={specialistId}
            onChange={({ target }) => setSpecialistId(target.value)}
          >
            {specialists?.map((specialist) => {
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
        </>
      )}
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

export default PatientForm
