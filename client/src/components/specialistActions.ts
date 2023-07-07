import { useQuery, useMutation, QueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { Specialist, SpecialistInput } from '../types'
import specialistService from '../services/specialist'

interface TableData {
  specialist: Specialist
  appointmentCount: number
  patientCount: number
}
const queryClient = new QueryClient()
// type TableDataUpdater = (prev: TableData[]) => TableData[]

export const useFetchSpecialists = (
  setSpecialists: Dispatch<SetStateAction<Specialist[]>>,
) => {
  return useQuery({
    queryKey: ['GET_SPECIALISTS'],
    queryFn: specialistService.getAll,
    onSuccess: (data) => setSpecialists(data),
    onError: (error: Error) => 'error ' + error?.message,
  })
}

export const useFetchSpecialistTable = (
  setTableData: Dispatch<SetStateAction<TableData[]>>,
) => {
  return useQuery({
    queryKey: ['GET_SPECIALISTS_TABLE'],
    queryFn: specialistService.getTableData,
    onSuccess: (data) => setTableData(data),
    onError: (error: Error) => 'error ' + error.message,
  })
}

export const useAddSpecialist = () => {
  return useMutation<Specialist, Error, [SpecialistInput]>(
    (variables) => {
      const [values] = variables
      return specialistService.create(values)
    },
    {
      onSuccess: (newSpecialist) => {
        queryClient.setQueryData<TableData[]>(
          ['GET_SPECIALISTS_TABLE'],
          (existingTableData = []) =>
            existingTableData.concat({
              specialist: newSpecialist,
              appointmentCount: 0,
              patientCount: 0,
            }),
        )
        queryClient.setQueryData<Specialist[]>(
          ['GET_SPECIALISTS'],
          (existingSpecialistData = []) =>
            existingSpecialistData.concat(newSpecialist),
        )
        queryClient.invalidateQueries({ queryKey: ['GET_SPECIALISTS'] })
      },
      onError: (error: Error) => console.log('Error: ', error.message),
    },
  )
}

export const useDeleteSpecialistById = (
  setTableData: Dispatch<SetStateAction<TableData[]>>,
  tableData: TableData[],
) => {
  return useMutation<void, Error, number>(
    (id: number) => specialistService.deleteById(id),
    {
      onSuccess: (_data, id: number) => {
        queryClient.setQueryData<Specialist[]>(
          ['GET_SPECIALISTS'],
          (existingSpecialistsData = []) =>
            existingSpecialistsData.filter(
              (specialist) => specialist.id !== id,
            ),
        )
        setTableData(
          tableData.filter(({ specialist }) => specialist.specialistId !== id),
        )
      },
      onError: (error: Error) => console.error('Error:', error),
    },
  )
}

export const useUpdateTableRowBySpecialistId = (
  handleUpdateTableRowBySpecialistId: (
    specialistId: number,
    data: Specialist,
  ) => void,
) => {
  return useMutation<Specialist, Error, [number, SpecialistInput]>(
    (variables) => {
      const [specialistId, values] = variables
      return specialistService.updateById(specialistId, values)
    },
    {
      onSuccess: (data: Specialist) => {
        handleUpdateTableRowBySpecialistId(data.specialistId, data)

        queryClient.setQueryData<Specialist[]>(
          ['GET_SPECIALISTS'],
          (existingSpecialistsData = []) =>
            existingSpecialistsData.filter(
              (specialist) => specialist.id !== data.specialistId,
            ),
        )
      },
      onError: (error: Error) => console.error('Error:', error),
    },
  )
}
