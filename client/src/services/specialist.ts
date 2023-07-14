import axios, { isAxiosError } from 'axios'
import { Specialist, SpecialistInput, TaskDetail } from '../types'
import { apiBaseUrl } from '../constants'
import { isSpecialist } from '../typeUtils'
const url = `${apiBaseUrl}/specialists/`

const getAll = async () => {
  const { data } = await axios.get<Specialist[]>(url)
  return data
}

const create = async (object: SpecialistInput) => {
  try {
    const { data } = await axios.post<SpecialistInput>(url, object)
    if (!isSpecialist(data)) {
      throw new Error('invalid specialist data')
    }
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error)
    } else {
      throw new Error('Unknown error creating specialist')
    }
  }
}

const deleteById = async (id: number) => {
  try {
    await axios.delete(url + id)
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error)
    } else {
      throw new Error('Unknown error deleting specialist')
    }
  }
}

const updateById = async (id: number, object: unknown) => {
  try {
    const { data } = await axios.put(url + id, object)
    if (!isSpecialist(data)) {
      throw new Error('invalid specialist data')
    }
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error)
    } else {
      throw new Error('Unknown error updating specialists')
    }
  }
}

const getTableData = async () => {
  try {
    const { data } = await axios.get(url + 'table-data')
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error)
    } else {
      throw new Error('Unknown error updating specialists')
    }
  }
}

const getTasksBySpecialistId = async (id: number) => {
  try {
    const { data } = await axios.get<TaskDetail[]>(url + id)
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error)
    } else {
      throw new Error('Unknown error fetching tasks')
    }
  }
}

export default {
  getAll,
  create,
  deleteById,
  updateById,
  getTableData,
  getTasksBySpecialistId,
}
