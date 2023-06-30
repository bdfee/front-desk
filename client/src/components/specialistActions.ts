import { useQuery } from 'react-query'
import { Dispatch, SetStateAction } from 'react'
import { Specialist } from '../types'
import specialistService from '../services/specialist'

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
