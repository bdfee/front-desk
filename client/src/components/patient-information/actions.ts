import { AppointmentDetail, PatientDetail } from '../../types'
import { useQuery } from '@tanstack/react-query'
import patientService from '../../services/patients'

export const useFetchAppointmentsByPatientId = (patientId: number) =>
  useQuery<AppointmentDetail[]>({
    queryKey: ['PATIENT_APPOINTMENTS', patientId],
    queryFn: () => patientService.getAppointmentsByPatient(patientId),
  })

export const useFetchPatientById = (patientId: number) =>
  useQuery<PatientDetail>({
    queryKey: ['PATIENT', patientId],
    queryFn: () => patientService.getOneById(patientId),
  })
