import { QueryClient, useMutation } from '@tanstack/react-query'
import patientService from '../../services/patients'
import { PatientDetail, PatientInput } from '../../types'
import { SetAlertPayload } from '../../types'

export const useAddPatient = (
  queryClient: QueryClient,
  setAlertPayload?: SetAlertPayload,
) =>
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

      setAlertPayload && setAlertPayload('success', 'patient added', 'page')
    },
    onError: () =>
      setAlertPayload &&
      setAlertPayload('error', 'error adding patient', 'page'),
  })

export const useUpdatePatientById = (
  queryClient: QueryClient,
  setAlertPayload?: SetAlertPayload,
) =>
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
      setAlertPayload && setAlertPayload('success', 'patient updated', 'page')
    },
    onError: () =>
      setAlertPayload &&
      setAlertPayload('error', 'error updaing patient', 'page'),
  })
