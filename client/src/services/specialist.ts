import axios from 'axios'
import { Specialist, SpecialistInput } from '../../types'
import { apiBaseUrl } from '../constants'
import { isSpecialist } from '../../typeUtils'
const url = `${apiBaseUrl}/specialists/`

const getAll = async () => {
  try {
    const { data } = await axios.get<Specialist[]>(url)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('axios error' + error.message)
    } else {
      console.log('unknown error getting specialists ' + error)
    }
  }
}

const create = async (object: SpecialistInput) => {
  try {
    const { data } = await axios.post<SpecialistInput>(url, object)
    if (!isSpecialist(data)) {
      throw new Error('invalid specialist data')
    }
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('axios error' + error.message)
    } else {
      console.log('unknown error creating specialists ' + error)
    }
  }
}

const deleteById = async (id: number) => {
  try {
    await axios.delete(url + id)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('axios error' + error.message)
    } else {
      console.log('unknown error deleting specialists')
    }
  }
}

export default {
  getAll,
  create,
  deleteById,
}
