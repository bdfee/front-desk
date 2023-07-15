import axios, { isAxiosError } from 'axios'
import { TaskDetail, TaskInput } from '../types'
import { apiBaseUrl } from '../constants'
import { isTask } from '../typeUtils'

const url = `${apiBaseUrl}/tasks/`

const getAll = async () => {
  const { data } = await axios.get<TaskDetail[]>(url)
  return data
}

const getOneById = async (id: number) => {
  const { data } = await axios.get<TaskDetail>(url + id)
  return data
}

const create = async (object: TaskInput) => {
  try {
    const { data } = await axios.post<TaskInput>(url, object)
    if (!isTask(data)) {
      throw new Error('invalid task data')
    }
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error)
    } else {
      throw new Error('Unknown error creating task')
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
      throw new Error('Unknown error deleting task')
    }
  }
}

const updateById = async (id: number, object: unknown) => {
  try {
    const { data }: { data: TaskDetail } = await axios.put(url + id, object)

    if (!isTask(data)) {
      throw new Error('invalid task data')
    }
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error)
    } else {
      throw new Error('Unknown error updating task')
    }
  }
}

export default {
  getAll,
  getOneById,
  create,
  deleteById,
  updateById,
}
