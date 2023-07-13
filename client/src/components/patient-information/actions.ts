import { AppointmentDetail, PatientDetail } from '../../types'
import { useQuery } from '@tanstack/react-query'
import patientService from '../../services/patients'
import { SetAlertPayload } from '../../types'

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

export const useFetchPatientById = (
  patientId: number,
  setAlertPayload?: SetAlertPayload,
) =>
  useQuery<PatientDetail>({
    queryKey: ['PATIENT', patientId],
    queryFn: () => patientService.getOneById(patientId),
    onError: () =>
      setAlertPayload &&
      setAlertPayload('error', 'error fetching patient', 'page'),
  })
