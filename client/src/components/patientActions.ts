import { SetStateAction, Dispatch } from 'react'
import { useQuery, useMutation } from 'react-query'
import { AppointmentDetail, PatientDetail, PatientInput } from '../types'
import patientService from '../services/patients'
import { queryClient } from '../App'

type HandleSetFormState = ({
  dateOfBirth,
  name,
  email,
  phone,
  gender,
  address,
  specialistId,
  patientId,
}: PatientDetail) => void
type SetPatient = Dispatch<SetStateAction<PatientDetail | undefined>>
type SetStateActions = HandleSetFormState | SetPatient

export const useFetchPatientByIdQuery = (
  setStateACtion: SetStateActions,
  patientId: number,
) => {
  return useQuery<PatientDetail, Error>({
    queryKey: [`GET_PATIENT_${patientId}`] as [string],
    queryFn: () => patientService.getOneById(patientId),
    onSuccess: (data) => setStateACtion(data),
    onError: (error: Error) => 'error ' + error?.message,
  })
}

export const useFetchAppointmentsByPatientId = (
  setAppointments: Dispatch<SetStateAction<AppointmentDetail[]>>,
  patientId: number,
) => {
  return useQuery<AppointmentDetail[], Error>({
    queryKey: [`GET_APPOINTMENTS_BY_PATIENT_${patientId}`] as [string],
    queryFn: () => patientService.getAppointmentsByPatient(patientId),
    onSuccess: (data) => setAppointments(data),
    onError: (error: Error) => 'error ' + error?.message,
  })
}

export const useFetchPatients = (
  setPatients: Dispatch<SetStateAction<PatientDetail[]>>,
) => {
  return useQuery<PatientDetail[], Error>({
    queryKey: 'GET_PATIENTS',
    queryFn: patientService.getAll,
    onSuccess: (data) => setPatients(data),
    onError: (error: Error) => 'error ' + error?.message,
  })
}

export const useDeletePatientById = (
  setPatients: Dispatch<SetStateAction<PatientDetail[]>>,
  patients: PatientDetail[],
) => {
  return useMutation<void, Error, number>(
    (id: number) => patientService.deleteById(id),
    {
      onSuccess: (_data, id: number) => {
        queryClient.invalidateQueries('GET_PATIENTS')
        setPatients(patients?.filter(({ patientId }) => patientId !== id))
      },
      onError: (error: Error) => console.error('Error:', error),
    },
  )
}

export const useUpdatePatientById = () => {
  return useMutation<PatientDetail, Error, [number, PatientInput]>(
    (variables) => {
      const [patientId, values] = variables
      return patientService.updateById(patientId, values)
    },
    {
      onSuccess: (_, variables: [number, PatientInput]) => {
        const [patientId] = variables
        queryClient.invalidateQueries({
          queryKey: [`GET_PATIENT_${patientId}`],
        })
        queryClient.invalidateQueries({
          queryKey: ['GET_PATIENTS'],
        })
      },
      onError: (error: Error) => console.error('Error:', error),
    },
  )
}

export const useAddPatient = () => {
  return useMutation<PatientDetail, Error, [PatientInput]>(
    (variables) => {
      const [values] = variables
      return patientService.create(values)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['GET_PATIENTS'] })
      },
      onError: (error: Error) => console.error('Error:', error),
    },
  )
}
