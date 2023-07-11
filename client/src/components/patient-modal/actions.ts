import { QueryClient, useMutation } from '@tanstack/react-query'
import patientService from '../../services/patients'
import { PatientDetail, PatientInput } from '../../types'

export const useAddPatient = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: patientService.create,
    onSuccess: (newPatient) => {
      queryClient.setQueryData<PatientDetail>(
        ['PATIENT', newPatient.patientId],
        newPatient,
      )

      queryClient.setQueryData<PatientDetail[]>(
        ['PATIENTS'],
        (oldPatients = []) => oldPatients.concat(newPatient),
      )

      queryClient.invalidateQueries({
        queryKey: ['SPECIALIST_TABLE'],
      })
    },
  })

export const useUpdatePatientById = (queryClient: QueryClient) =>
  useMutation<
    PatientDetail,
    Error,
    { patientId: number; values: PatientInput }
  >({
    mutationFn: ({ patientId, values }) =>
      patientService.updateById(patientId, values),
    onSuccess: (data, { patientId }) => {
      queryClient.setQueryData<PatientDetail>(['PATIENT', patientId], data)
      queryClient.invalidateQueries({ queryKey: ['PATIENTS'] })
    },
  })
