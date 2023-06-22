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
import appointmentService from '../../services/appointment'
import specialistService from '../../services/specialist'

import { SyntheticEvent, useEffect, useState, useContext } from 'react'
import {
  AppointmentDetail,
  AppointmentInput,
  Patient,
  Specialist,
} from '../../types'

import { ErrorCtx } from '../../App'
import { useParams } from 'react-router-dom'
import { validateTextInput } from '../../validations/inputs'

type UpdateAppointment = (id: number, values: AppointmentInput) => Promise<void>
type AddAppointment = (values: AppointmentInput) => Promise<void>

interface AppointmentFormProps {
  type: string
  state: AppointmentDetail | AppointmentDetail[] | undefined
  service: UpdateAppointment | AddAppointment | undefined
}

const AppointmentForm = (props: AppointmentFormProps) => {
  const [appointment, setAppointment] = useState<AppointmentDetail | null>(null) // won't be here
  const [specialists, setSpecialists] = useState<Specialist[]>([])
  const [appointmentId, setAppointmentId] = useState<string>('')
  const [start, setStart] = useState<string>('')
  const [end, setEnd] = useState<string>('')
  const [date, setDate] = useState<Dayjs | null>(null)
  const [description, setDescription] = useState<string>('')
  const [specialistId, setSpecialistId] = useState<string>('')
  const [patientId, setPatientId] = useState<string>('')
  const { id } = useParams<{ id: string }>() // wont be here

  const errorCtx = useContext(ErrorCtx)

  useEffect(() => {
    if (id) {
      const fetchAppointment = async () => {
        const appointment = await appointmentService.getOneById(+id)
        setAppointment(appointment)
      }
    }
  }, [])

  useEffect(() => {
    const fetchSpecialists = async () => {
      const specialists = await specialistService.getAll()
      setSpecialists(specialists)
    }
    fetchSpecialists()
  }, [])

  useEffect(() => {
    if (props.type === 'edit') {
      const {
        appointmentId,
        start,
        end,
        date,
        description,
        specialist,
        patient,
      } = props.state as AppointmentDetail
      const d = dayjs(date)
      setAppointmentId(appointmentId.toString())
      setStart(start)
      setEnd(end)
      setDate(d)
      setDescription(description)
      setSpecialistId(specialist.specialistId.toString())
      setPatientId(patient.patientId.toString())
    }
  }, [])

  const fieldsFilled = 
  !start.trim() ||
  !end.trim() ||
  !date ||
  !description.trim() ||
  !specialistId.trim() ||
  !patientId.trim() ||

  const submitForm = (event: SyntheticEvent) => {
    event.preventDefault()
    // add validation
  }

  const appointmentValues = {
    start,
    end,
    date,
    description,
    specialistId,
    patientId
  }

  // will this be the only thing needed

  switch (props.type) {
    case 'edit': {
      if (props.service && appointmentId) {
        const updateAppointment = props.service as UpdateAppointment
        updateAppointment(appointmentId, updateAppointment)
      }
    }
  }

}
