import { useQuery } from '@tanstack/react-query'
import {
  Specialist,
  PatientDetail,
  AppointmentDetail,
  SafeUser,
} from '../../types'
import specialistService from '../../services/specialist'
import patientService from '../../services/patients'
import userService from '../../services/user'
import { SetAlertPayload } from '../../types'

export const useFetchSpecialists = (setAlertPayload?: SetAlertPayload) =>
  useQuery<Specialist[]>({
    queryKey: ['SPECIALISTS'],
    queryFn: specialistService.getAll,
    onError: () =>
      setAlertPayload &&
      setAlertPayload('error', 'error fetching specialists', 'modal'),
  })

export const useFetchPatients = (setAlertPayload?: SetAlertPayload) =>
  useQuery<PatientDetail[]>({
    queryKey: ['PATIENTS'],
    queryFn: patientService.getAll,
    onError: () =>
      setAlertPayload &&
      setAlertPayload('error', 'error fetching patients', 'modal'),
  })

export const useFetchAppointmentsByPatientId = (
  patientId: number,
  setAlertPayload?: SetAlertPayload,
) =>
  useQuery<AppointmentDetail[]>({
    queryKey: ['PATIENT_APPOINTMENTS', patientId],
    queryFn: () => patientService.getAppointmentsByPatient(patientId),
    onError: () =>
      setAlertPayload &&
      setAlertPayload('error', 'error fetching appointments', 'page'),
  })

export const useFetchUsers = (setAlertPayload?: SetAlertPayload) =>
  useQuery<SafeUser[]>({
    queryKey: ['USERS'],
    queryFn: userService.getAll,
    onError: () =>
      setAlertPayload &&
      setAlertPayload('error', 'error fetching users', 'modal'),
  })
