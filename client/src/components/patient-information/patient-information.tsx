// import { useContext } from 'react'
import { Container, Typography, Box, List, ListItemText } from '@mui/material'
import { AppointmentDetail, PatientDetail } from '../../types'
import { useQuery } from '@tanstack/react-query'
// import { ErrorCtx } from '../../App'
import patientService from '../../services/patients'

interface InformationListProps {
  patientId: number
}

const InformationList = ({ patientId }: InformationListProps) => {
  // const errorCtx = useContext(ErrorCtx)

  let patient: PatientDetail
  let appointments: AppointmentDetail[]

  const {
    data: appointmentsByPatientIdData,
    status: appointmentsByPatientIdStatus,
  } = useQuery<AppointmentDetail[]>({
    queryKey: ['PATIENT_APPOINTMENTS', patientId],
    queryFn: () => patientService.getAppointmentsByPatient(patientId),
  })

  const { data: patientData, status: patientStatus } = useQuery<PatientDetail>({
    queryKey: ['PATIENT', patientId],
    queryFn: () => patientService.getOneById(patientId),
  })

  const sortAppointments = (appointments: AppointmentDetail[]) => {
    const history: AppointmentDetail[] = []
    const upcoming: AppointmentDetail[] = []

    appointments.forEach((appointment) => {
      new Date() > new Date(appointment.date)
        ? history.push(appointment)
        : upcoming.push(appointment)
    })

    return { history, upcoming }
  }

  if (patientStatus === 'error') {
    return <div>error fetching patients</div>
  }

  if (appointmentsByPatientIdStatus === 'error') {
    return <div>error fetching patient appointments</div>
  }

  if (patientStatus === 'loading') {
    return <div>loading patient</div>
  } else patient = patientData

  if (appointmentsByPatientIdStatus === 'loading') {
    return <div>loading patient</div>
  } else appointments = appointmentsByPatientIdData

  const { history, upcoming } = sortAppointments(appointments)

  return (
    <Container>
      <Typography>{patient.name}</Typography>
      <Box>
        <List>
          <ListItemText primary="gender" secondary={patient.gender} />
          <ListItemText
            primary="date of birth"
            secondary={patient.dateOfBirth}
          />
          <ListItemText primary="email" secondary={patient.email} />
          <ListItemText primary="dateOfBirth" secondary={patient.dateOfBirth} />
          <ListItemText primary="address" secondary={patient.address} />
          <ListItemText
            primary="specialist"
            secondary={patient.specialist.name}
          />
        </List>
        <Typography>Appointment History</Typography>
        <List>
          {appointments.length &&
            history.map((appointment) => {
              return (
                <ListItemText
                  key={appointment.appointmentId}
                  primary={appointment.date + ' ' + appointment.specialist.name}
                />
              )
            })}
        </List>
        <Typography>Upcoming Appointments</Typography>
        <List>
          {upcoming.map((appointment) => {
            return (
              <ListItemText
                key={appointment.appointmentId}
                primary={appointment.date + ' ' + appointment.specialist.name}
              />
            )
          })}
        </List>
      </Box>
    </Container>
  )
}

export default InformationList
