import axios from 'axios'
import { Specialist, SpecialistInput } from '../../types'
import { apiBaseUrl } from '../constants'

const url = `${apiBaseUrl}/specialists/`

const isSpecialist = (object: unknown): object is Specialist => {
  if (!object || typeof object !== 'object') {
    throw new Error('malformed specialist object')
  }
  const { specialistId, name, speciality } = object as Specialist
  return (
    typeof specialistId === 'number' &&
    typeof name === 'string' &&
    typeof speciality === 'string'
  )
}

const getAll = async () => {
  const { data } = await axios.get<Specialist[]>(url)
  return data
}

const create = async (object: SpecialistInput): Promise<Specialist> => {
  const { data } = await axios.post<SpecialistInput>(url, object)
  if (!isSpecialist(data)) {
    throw new Error('invalid specialist data returned')
  }
  return data
}

const deleteById = async (id: number) => {
  try {
    await axios.delete(url + id)
  } catch (error) {
    throw new Error('error deleting by id ' + error)
  }
}

export default {
  getAll,
  create,
  deleteById,
}
