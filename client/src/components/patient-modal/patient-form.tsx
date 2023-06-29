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
import { useQuery, UseQueryResult } from 'react-query'
import { SyntheticEvent, useEffect, useState, useContext } from 'react'
import { Gender, PatientDetail, PatientInput, Specialist } from '../../types'
import {
  validateTextInput,
  sanitizeTextInput,
  sanitizeEmail,
} from '../../validations/inputs'

import { formatPhone, validateEmail } from '../../validations/inputs'
import { ErrorCtx } from '../../App'

type UpdatePatient = (id: number, values: PatientInput) => Promise<void>

type AddPatient = (values: PatientInput) => Promise<void>

interface PatientFormProps {
  type: string
  onCancel: () => void
  state: PatientDetail | PatientDetail[] | undefined
  service: UpdatePatient | AddPatient | undefined
}

const PatientForm = (props: PatientFormProps) => {
  const [specialists, setSpecialists] = useState<Specialist[]>()

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

  const { data }: UseQueryResult<Specialist[]> = useQuery({
    queryKey: 'GET_SPECIALISTS',
    queryFn: specialistService.getAll,
    onSuccess: (data) => setSpecialists(data),
    onError: (error: Error) =>
      errorCtx?.setError('error fetching specialists ' + error.message),
  })

  useEffect(() => {
    if (props.type === 'update') {
      const {
        dateOfBirth,
        name,
        email,
        phone,
        gender,
        address,
        specialistId,
        patientId,
      } = props.state as PatientDetail
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
  }, [])

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

    switch (props.type) {
      case 'update': {
        if (props.service && patientId) {
          const updatePatient = props.service as UpdatePatient
          updatePatient(patientId, patientValues)
        }
        break
      }
      case 'add': {
        if (props.service) {
          const addPatient = props.service as AddPatient
          addPatient(patientValues)
        }
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
  }

  if (!data) {
    return <div>fetching patients</div>
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
            {props.type}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default PatientForm
